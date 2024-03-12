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
import { Card, CardHeader } from '@mui/material';
import NewMemberForm from 'src/sections/components/forms/new-member';

const Page: NextPage = () => {
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Product Create" />
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
              <Typography variant="h4">Créer un nouveau membre</Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.membres.index}
                  variant="subtitle2"
                >
                  Gestion membres
                </Link>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  Nouveau Membre
                </Typography>
              </Breadcrumbs>
            </Stack>
            <Container maxWidth="md">
              <Card>
                <NewMemberForm></NewMemberForm>
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
