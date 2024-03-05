import type { FC } from 'react';
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import ReceiptCheckIcon from '@untitled-ui/icons-react/build/esm/ReceiptCheck';
import ReceiptIcon from '@untitled-ui/icons-react/build/esm/Receipt';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const InvoiceListSummary: FC = () => (
  <div>
    <Grid
      container
      spacing={3}
    >
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <Card>
          <CardContent>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Avatar
                sx={{
                  height: 48,
                  width: 48,
                }}
              >
                <ReceiptIcon />
              </Avatar>
              <div>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Total
                </Typography>
                <Typography variant="h6">$5,300.00</Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Sur 12 factures
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <Card>
          <CardContent>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Avatar
                sx={{
                  backgroundColor: 'success.lightest',
                  color: 'success.main',
                  height: 48,
                  width: 48,
                }}
              >
                <ReceiptCheckIcon />
              </Avatar>
              <div>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Payé
                </Typography>
                <Typography variant="h6">$1,439.60</Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  3 factures
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        xs={12}
        md={6}
        lg={4}
      >
        <Card>
          <CardContent>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Avatar
                sx={{
                  backgroundColor: 'warning.lightest',
                  color: 'warning.main',
                  height: 48,
                  width: 48,
                }}
              >
                <ClockIcon />
              </Avatar>
              <div>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  En cours
                </Typography>
                <Typography variant="h6">$276.87</Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  2 factures
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
);
