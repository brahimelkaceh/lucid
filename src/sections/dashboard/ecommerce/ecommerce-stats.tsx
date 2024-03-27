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

interface EcommerceStatsProps {
  cost: number;
  profit: number;
  sales: number;
}

export const EcommerceStats: FC<EcommerceStatsProps> = (props) => {
  const { cost, profit, sales } = props;

  const formattedCost = numeral(cost).format('0.[0]a');
  const formattedProfit = numeral(profit).format('0.[0]a');
  const formattedSales = numeral(sales).format('0.[0]a');

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={4}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',

                borderRadius: 2.5,
                px: 3,
                py: 4,
              }}
            >
              <div>
                <Typography
                  color="text.main"
                  variant="body2"
                >
                  Solde caisse
                </Typography>
                <Typography variant="h5">{formattedSales}</Typography>
              </div>
              <Box
                sx={{
                  flexShrink: 0,
                  height: 48,
                  width: 48,
                  '& img': {
                    width: '100%',
                  },
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: 'primary.contrastText',
                    color: 'primary.main',
                    height: 48,
                    width: 48,
                  }}
                >
                  <SvgIcon>
                    <CurrencyDollarIcon />
                  </SvgIcon>
                </Avatar>
              </Box>
            </Stack>
          </Grid>
          <Grid
            xs={12}
            md={4}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
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
                  Total Revenus
                </Typography>
                <Typography variant="h5">{formattedCost}</Typography>
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
            md={4}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
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
                  Total Paiements{' '}
                </Typography>
                <Typography variant="h5">{formattedCost}</Typography>
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
      </CardContent>
    </Card>
  );
};

EcommerceStats.propTypes = {
  cost: PropTypes.number.isRequired,
  profit: PropTypes.number.isRequired,
  sales: PropTypes.number.isRequired,
};
