import type { NextPage } from 'next';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
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
import NewProject from 'src/sections/components/forms/new-project';
import { Previewer } from 'src/sections/components/previewer';
import NewCustomerForm from 'src/sections/components/forms/new-customer';
import NewInstallment from 'src/sections/components/forms/new-installment';
import { SeverityPill } from 'src/components/severity-pill';
import NewMemberForm from 'src/sections/components/forms/new-member';
import NewExpense from 'src/sections/components/forms/new-expense';

const Page: NextPage = () => {
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted successfully');
  };
  const settings = useSettings();

  usePageView();

  return (
    <>
      <Seo title="Charger & Dépenses: Utilities " />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
            sx={{
              flexGrow: 1,
              py: 1,
            }}
          >
            <div>
              <Typography variant="h4">Utilities</Typography>
            </div>
          </Stack>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid
              xs={12}
              md={12}
            >
              <Container maxWidth="lg">
                <Previewer title="Nouvelles dépenses">
                  <NewExpense onSubmit={handleSubmit}></NewExpense>
                </Previewer>
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
