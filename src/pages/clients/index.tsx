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
import { Card, CardHeader, Divider } from '@mui/material';
import NewCustomerForm from 'src/sections/components/forms/new-customer';

const now = new Date();

const Page: NextPage = () => {
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Revenus: Gestion clients" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
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
              <Box sx={{ p: 3 }}>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                  sx={{ mx: 5 }}
                >
                  <div>
                    <Typography variant="h4">Gestion clients</Typography>
                  </div>
                </Stack>
              </Box>
            </Grid>
            <Grid xs={12}>
              <Container maxWidth="xl">
                <Card>
                  <CardHeader title="Nouveau client" />
                  <Divider />
                  <NewCustomerForm></NewCustomerForm>
                </Card>
              </Container>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
