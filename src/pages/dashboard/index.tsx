import type { NextPage } from 'next';
import { addDays, formatDistanceToNowStrict, subDays, subHours, subMinutes } from 'date-fns';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { EcommerceStats } from 'src/sections/dashboard/ecommerce/ecommerce-stats';
import { EcommerceProducts } from 'src/sections/dashboard/ecommerce/ecommerce-products';
import { DashboardStats } from 'src/sections/dashboard/ecommerce/dashboard-stats';

const now = new Date();

const Page: NextPage = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Tableau de bord" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">Tableau de bord</Typography>
                </div>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Etat des Appels à Projets
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 3,
                }}
              >
                <EcommerceStats
                  cost={99700}
                  profit={32100}
                  sales={152000}
                />
                <DashboardStats
                  cost={99700}
                  profit={32100}
                  sales={152000}
                />
              </Stack>
            </Grid>
            <Grid
              xs={12}
              lg={4}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 4,
                }}
              >
                <EcommerceProducts
                  products={[
                    {
                      id: '5eff2512c6f8737d08325676',
                      category: '#A',
                      image: '/assets/products/product-1.png',
                      name: 'Saving Fund 1',
                      status: 'Non Remporté',
                      color: 'error',
                      sales: 13153,
                    },
                    {
                      id: '5eff2516247f9a6fcca9f151',
                      category: '#A',
                      image: '/assets/products/product-2.png',
                      name: 'Saving Fund 2',
                      status: 'Remporté',
                      color: 'success',
                      sales: 10300,
                    },
                    {
                      id: '5eff251a3bb9ab7290640f18',
                      category: '#A',
                      name: 'Saving Fund 3',
                      status: 'Remporté',
                      color: 'success',
                      sales: 5300,
                    },
                    {
                      id: '5eff251e297fd17f0dc18a8b',
                      category: '#A',
                      image: '/assets/products/product-4.png',
                      name: 'Saving Fund 4',
                      status: 'En cours',
                      color: 'warning',
                      sales: 1203,
                    },
                    {
                      id: '5eff2524ef813f061b3ea39f',
                      category: '#A',
                      image: '/assets/products/product-5.png',
                      name: 'Saving Fund 5',
                      status: 'Non Remporté',
                      color: 'error',
                      sales: 254,
                    },
                    {
                      id: '5eff2524ef813f061b3ea39f',
                      category: '#A',
                      image: '/assets/products/product-5.png',
                      name: 'Saving Fund 6',
                      status: 'Non Remporté',
                      color: 'warning',
                      sales: 254,
                    },
                    {
                      id: '5eff2524ef813f061b3ea39f',
                      category: '#A',
                      image: '/assets/products/product-5.png',
                      name: 'Saving Fund 7',
                      status: 'Non Remporté',
                      color: 'warning',
                      sales: 254,
                    },
                    {
                      id: '5eff2524ef813f061b3ea39f',
                      category: '#A',
                      image: '/assets/products/product-5.png',
                      name: 'Saving Fund 5',
                      status: 'Non Remporté',
                      color: 'success',
                      sales: 254,
                    },
                  ]}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
