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
import DashboardStats from 'src/sections/components/quick-stats/dashboard-quick-stats';
import { useTranslation } from 'react-i18next';

const now = new Date();

const Page: NextPage = () => {
  const settings = useSettings();
  const { t } = useTranslation();

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
              // lg={8}
            >
              <Stack
                spacing={{
                  xs: 3,
                  lg: 3,
                }}
              >
                <DashboardStats />
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
              ></Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
