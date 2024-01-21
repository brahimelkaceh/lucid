import type { NextPage } from 'next';
import { subDays, subHours } from 'date-fns';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import ProjectsTable from './components/projects-table';

const now = new Date();
export interface Project {
  id: string;
  avatar: string;
  city: string;
  country: string;
  currency: string;
  email: string;
  hasAcceptedMarketing: boolean;
  isProspect: boolean;
  isReturning: boolean;
  name: string;
  state: string;
  totalSpent: number;
  totalOrders: number;
  updatedAt: number;
}

const projects: Project[] = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    city: 'Cleveland',
    country: 'USA',
    currency: '$',
    email: 'carson.darrin@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: 'Carson Darrin',
    state: 'Ohio',
    totalSpent: 300.0,
    totalOrders: 3,
    updatedAt: subDays(subHours(now, 7), 1).getTime(),
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    city: 'Atlanta',
    country: 'USA',
    currency: '$',
    email: 'fran.perez@devias.io',
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: 'Fran Perez',
    state: 'Georgia',
    totalSpent: 0.0,
    totalOrders: 0,
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    city: 'North Canton',
    country: 'USA',
    currency: '$',
    email: 'jie.yan.song@devias.io',
    hasAcceptedMarketing: false,
    isProspect: false,
    isReturning: false,
    name: 'Jie Yan Song',
    state: 'Ohio',
    totalSpent: 5600.0,
    totalOrders: 6,
    updatedAt: subDays(subHours(now, 4), 2).getTime(),
  },
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-anika-visser.png',
    city: 'Madrid',
    country: 'Spain',
    currency: '$',
    email: 'anika.visser@devias.io',
    hasAcceptedMarketing: true,
    isProspect: false,
    isReturning: true,
    name: 'Anika Visser',
    state: 'Madrid',
    totalSpent: 500.0,
    totalOrders: 1,
    updatedAt: subDays(subHours(now, 11), 2).getTime(),
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    city: 'San Diego',
    country: 'USA',
    currency: '$',
    email: 'miron.vitold@devias.io',
    hasAcceptedMarketing: true,
    isProspect: true,
    isReturning: false,
    name: 'Miron Vitold',
    totalSpent: 0.0,
    totalOrders: 0,
    state: 'California',
    updatedAt: subDays(subHours(now, 7), 3).getTime(),
  },
];

const Page: NextPage = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Revenus: Gestion projets" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <div>
                  <Typography variant="h4">Gestion projets</Typography>
                </div>
              </Stack>
              <ProjectsTable projects={projects} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
