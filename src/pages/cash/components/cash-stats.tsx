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

import { SeverityPill } from 'src/components/severity-pill';

const CashStats: FC = () => (
  <Grid
    container
    spacing={3}
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
              Solde Caisse
            </Typography>
            <Stack
              alignItems="center"
              direction="row"
              spacing={1}
            >
              <Typography variant="h5">MAD 24,000</Typography>
              {/* <SeverityPill
                color="success"
                sx={{
                  backgroundColor: 'text.primary',
                }}
              >
                4%
              </SeverityPill> */}
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
              <CurrencyDollarIcon />
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
              Total Entrées
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
              <CurrencyDollarIcon />
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
              Total Sorties
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
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </Card>
    </Grid>
  </Grid>
);

export default CashStats;
