import type { FC } from 'react';
import CurrencyDollarIcon from '@untitled-ui/icons-react/build/esm/CurrencyDollar';
import FolderIcon from '@untitled-ui/icons-react/build/esm/Folder';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import GroupIcon from '@mui/icons-material/Group';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ConstructionIcon from '@mui/icons-material/Construction';
import AddCardIcon from '@mui/icons-material/AddCard';
import AllExpenses from '../tables/all-expenses-table';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
const DashboardStats: FC = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      spacing={4}
      pb={2}
      xs={12}
      lg={12}
      md={12}
      maxWidth={'xl'}
    >
      <Grid
        xs={12}
        md={12}
        lg={4}
      >
        <Card
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Stack
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                color="inherit"
                variant="overline"
              >
                {t(tokens.common.soldecaisse)}
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Typography variant="h5">MAD 24,000</Typography>
              </Stack>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'primary.contrastText',
                color: 'primary.main',
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CardMembershipIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Card>
      </Grid>

      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <Card>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Stack
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                color="text.secondary"
                variant="overline"
              >
                Total Revenues
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Typography variant="h5">MAD 24,000</Typography>
              </Stack>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CurrencyExchangeIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Card>
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <Card>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Stack
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                color="text.secondary"
                variant="overline"
              >
                Total salaires
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Typography variant="h5">MAD 24,000</Typography>
              </Stack>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <GroupIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Card>
      </Grid>
      <Grid
        xs={6}
        md={6}
        lg={4}
        container
        spacing={4}
      >
        <Grid xs={12}>
          <Card>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ p: 3 }}
            >
              <Stack
                spacing={1}
                sx={{ flexGrow: 1 }}
              >
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  Total utilities
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Typography variant="h5">MAD 24,000</Typography>
                </Stack>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  height: 48,
                  width: 48,
                }}
              >
                <SvgIcon>
                  <ConstructionIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ p: 3 }}
            >
              <Stack
                spacing={1}
                sx={{ flexGrow: 1 }}
              >
                <Typography
                  color="text.secondary"
                  variant="overline"
                >
                  Total Tranches
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Typography variant="h5">MAD 24,000</Typography>
                </Stack>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  height: 48,
                  width: 48,
                }}
              >
                <SvgIcon>
                  <AddCardIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={8}
        container
      >
        <Grid xs={12}>
          <Card>
            <AllExpenses />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardStats;
