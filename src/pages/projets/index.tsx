import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import type { Customer } from 'src/types/customer';
import { useSettings } from 'src/hooks/use-settings';
import ProjectListSearch from './components/Project-list-search';
import ProjectListTable from './components/project-list-table';
import { paths } from 'src/paths';
import { RouterLink } from 'src/components/router-link';
import { Project } from 'src/types/project';
import FirebaseProjects from 'src/firebaseServices/projets';

interface Filters {
  query?: string;
}

interface ProjectsSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const useProjectsSearch = () => {
  const [state, setState] = useState<ProjectsSearchState>({
    filters: {
      query: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'project_name',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback(
    (sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
      setState((prevState) => ({
        ...prevState,
        sortBy: sort.sortBy,
        sortDir: sort.sortDir,
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
      setState((prevState) => ({
        ...prevState,
        page,
      }));
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  };
};

interface ProjectsStoreState {
  projects: Project[];
  projectsCount: number;
}

const useProjectsStore = (searchState: ProjectsSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ProjectsStoreState>({
    projects: [],
    projectsCount: 0,
  });

  const handleProjectsGet = useCallback(async () => {
    const firebaseProjects = new FirebaseProjects();

    try {
      const response = await firebaseProjects.getAllProjects(searchState);
      console.log(response);

      if (isMounted()) {
        setState({
          projects: response.projects,
          projectsCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleProjectsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state,
  };
};

const useProjectIds = (projects: Project[] = []) => {
  return useMemo(() => {
    return projects.map((project) => project.id);
  }, [projects]);
};

const Page: NextPage = () => {
  const projectsSearch = useProjectsSearch();
  const projectsStore = useProjectsStore(projectsSearch.state);
  const projectsIds = useProjectIds(projectsStore.projects);
  const projectsSelection = useSelection<string>(projectsIds);
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Revenus: Gestion projets" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Gestion projets</Typography>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  component={RouterLink}
                  href={paths.dashboard.projets.create}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouveau Projet
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.dashboard.projets.tranche}
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Nouvelle Tranche
                </Button>
              </Stack>
            </Stack>
            <Card>
              <ProjectListSearch
                onFiltersChange={projectsSearch.handleFiltersChange}
                onSortChange={projectsSearch.handleSortChange}
                sortBy={projectsSearch.state.sortBy}
                sortDir={projectsSearch.state.sortDir}
              />
              <ProjectListTable
                count={projectsStore.projectsCount}
                items={projectsStore.projects}
                onDeselectAll={projectsSelection.handleDeselectAll}
                onDeselectOne={projectsSelection.handleDeselectOne}
                onPageChange={projectsSearch.handlePageChange}
                onRowsPerPageChange={projectsSearch.handleRowsPerPageChange}
                onSelectAll={projectsSelection.handleSelectAll}
                onSelectOne={projectsSelection.handleSelectOne}
                page={projectsSearch.state.page}
                rowsPerPage={projectsSearch.state.rowsPerPage}
                selected={projectsSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
