import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { paths } from 'src/paths';
import { ProductCreateForm } from 'src/sections/dashboard/product/product-create-form';

import NewProject from 'src/sections/components/forms/new-project';
import { Previewer } from 'src/sections/components/previewer';
import { Card } from '@mui/material';
import NewMemberForm from 'src/sections/components/forms/new-member';
import NewCustomerForm from 'src/sections/components/forms/new-customer';

const Page: NextPage = () => {
  usePageView();
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted successfully');
  };
  return (
    <>
      <Seo title="Revenus: Nouveau Client" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //   py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">Créer un nouveau client</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.clients.index}
                  variant="subtitle2"
                >
                  Gestion clients
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Nouveau Client
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Container maxWidth="lg">
              <Card>
                <NewCustomerForm onSubmit={handleSubmit}></NewCustomerForm>
              </Card>
            </Container>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
