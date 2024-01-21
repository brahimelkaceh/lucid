import type { FC } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Avatar, SvgIcon } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyDollarIcon from '@untitled-ui/icons-react/build/esm/CurrencyDollar';

interface DashboardStatsProps {
  cost: number;
  profit: number;
  sales: number;
}

export const DashboardStats: FC<DashboardStatsProps> = (props) => {
  const { cost, profit, sales } = props;

  const formattedCost = numeral(cost).format('0.[0]a');
  const formattedProfit = numeral(profit).format('0.[0]a');
  const formattedSales = numeral(sales).format('0.[0]a');

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid
          xs={12}
          md={6}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
              borderRadius: 2.5,
              px: 3,
              py: 4,
            }}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
                justifyContent="space-between"
              >
                Revenus Projets
              </Typography>
              <Typography variant="h5">MAD {formattedCost}</Typography>
            </div>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'dark' ? 'neutral.100' : 'neutral.100'),
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CurrencyDollarIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
              borderRadius: 2.5,
              px: 3,
              py: 4,
            }}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Total Achats
              </Typography>
              <Typography variant="h5">MAD {formattedCost}</Typography>
            </div>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'dark' ? 'neutral.100' : 'neutral.100'),
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CurrencyDollarIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
              borderRadius: 2.5,
              px: 3,
              py: 4,
            }}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Revenus Clients
              </Typography>
              <Typography variant="h5">MAD {formattedCost}</Typography>
            </div>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'dark' ? 'neutral.100' : 'neutral.100'),
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CurrencyDollarIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
              borderRadius: 2.5,
              px: 3,
              py: 4,
            }}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Factures impayées
              </Typography>
              <Typography variant="h5">MAD {formattedCost}</Typography>
            </div>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'dark' ? 'neutral.100' : 'neutral.100'),
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CurrencyDollarIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
              borderRadius: 2.5,
              px: 3,
              py: 4,
            }}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Revenus Membres
              </Typography>
              <Typography variant="h5">MAD {formattedCost}</Typography>
            </div>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'dark' ? 'neutral.100' : 'neutral.100'),
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CurrencyDollarIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={6}
        >
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.200',
              borderRadius: 2.5,
              px: 3,
              py: 4,
            }}
          >
            <div>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Income projets
              </Typography>
              <Typography variant="h5">MAD {formattedCost}</Typography>
            </div>
            <Avatar
              sx={{
                backgroundColor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'dark' ? 'neutral.100' : 'neutral.100'),
                height: 48,
                width: 48,
              }}
            >
              <SvgIcon>
                <CurrencyDollarIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

DashboardStats.propTypes = {
  cost: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
};
