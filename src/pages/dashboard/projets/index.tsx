import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NextPage } from 'next';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { OrderListContainer } from 'src/sections/dashboard/order/order-list-container';
import type { Customer } from 'src/types/customer';
import { OrderListSearch } from './components/order-list-search';
import { ProjectDrawer } from './components/project-drawer';
import { customersApi } from 'src/api/customers';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { allProjectsApi } from 'src/api/projects';
import { Project } from 'src/types/project';
import { ProjectListTable } from './components/project-list-table';
import FirebaseProjects from 'src/firebaseServices/projets';
interface Filters {
  query?: string;
  status?: string;
}

type SortDir = 'asc' | 'desc';

interface ProjectSearchState {
  filters: Filters;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  sortDir?: SortDir;
}

const useProjectsSearch = () => {
  const [state, setState] = useState<ProjectSearchState>({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  });

  const handleFiltersChange = useCallback((filters: Filters): void => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }));
  }, []);

  const handleSortChange = useCallback((sortDir: SortDir): void => {
    setState((prevState) => ({
      ...prevState,
      sortDir,
    }));
  }, []);

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
  projctsCount: number;
}

const useProjectsStore = (searchState: ProjectSearchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState<ProjectsStoreState>({
    projects: [],
    projctsCount: 0,
  });

  const handleProjectsGet = useCallback(async () => {
    const firebaseProjects = new FirebaseProjects();

    try {
      const response = await firebaseProjects.getAllProjects(searchState);

      if (isMounted()) {
        setState({
          projects: response.projects,
          projctsCount: response.count,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  const handleProjectDelete = useCallback(() => {
    handleProjectsGet();
  }, [handleProjectsGet]);

  const handleProjectUpdate = useCallback(() => {
    handleProjectsGet();
  }, [handleProjectsGet]);

  useEffect(() => {
    handleProjectsGet();
  }, [searchState]);

  return {
    ...state,
    onDeleteProject: handleProjectDelete,
    onUpdateProject: handleProjectUpdate,
  };
};

const useCurrentProject = (projects: Project[], id?: string): Project | undefined => {
  return useMemo((): Project | undefined => {
    if (!id) {
      return undefined;
    }

    return projects.find((Project) => Project.id === id);
  }, [projects, id]);
};

const Page: NextPage = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const projectsSearch = useProjectsSearch();
  const projectsStore = useProjectsStore(projectsSearch.state);
  const dialog = useDialog<string>();
  const currentProject = useCurrentProject(projectsStore.projects, dialog.data);

  usePageView();

  const handleOrderOpen = useCallback(
    (orderId: string): void => {
      // Close drawer if is the same order

      if (dialog.open && dialog.data === orderId) {
        dialog.handleClose();
        return;
      }

      dialog.handleOpen(orderId);
    },
    [dialog]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await allProjectsApi?.getAllProjects();
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [1]); // empty dependency array means it runs only once on mount
  return (
    <>
      <Seo title="Revenus: Gestion Projets" />
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <OrderListContainer open={dialog.open}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-end"
                direction="row"
                justifyContent="space-between"
                spacing={4}
                sx={{ mx: 5 }}
              >
                <div>
                  <Typography variant="h4">Gestion projets</Typography>
                </div>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
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
                    href={paths.dashboard.projets.newTranche}
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
            </Box>

            <Divider />

            <OrderListSearch
              onFiltersChange={projectsSearch.handleFiltersChange}
              onSortChange={projectsSearch.handleSortChange}
              sortBy={projectsSearch.state.sortBy}
              sortDir={projectsSearch.state.sortDir}
            />
            <Divider />
            <ProjectListTable
              count={projectsStore.projctsCount}
              items={projectsStore.projects}
              onPageChange={projectsSearch.handlePageChange}
              onRowsPerPageChange={projectsSearch.handleRowsPerPageChange}
              onSelect={handleOrderOpen}
              page={projectsSearch.state.page}
              rowsPerPage={projectsSearch.state.rowsPerPage}
              onDeleteProject={projectsStore.onDeleteProject}
            />
          </OrderListContainer>
          <ProjectDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            project={currentProject}
            onUpdateProject={projectsStore.onUpdateProject}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
