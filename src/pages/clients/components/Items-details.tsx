import type { FC } from 'react';
import { addDays, format, subMinutes } from 'date-fns';
import numeral from 'numeral';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

export const ItemsDetails: FC = () => {
  const subTotal = numeral(500.0).format('0,0.00');
  const taxe = numeral(100.0).format('0,0.00');
  const total = numeral(600.0).format('0,0.00');

  return (
    <List>
      <ListItem
        disableGutters
        divider
        sx={{
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography variant="subtitle2">Total HT</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          MAD {subTotal}
        </Typography>
      </ListItem>
      <ListItem
        disableGutters
        divider
        sx={{
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography variant="subtitle2">TVA 20%</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          MAD {taxe}
        </Typography>
      </ListItem>
      <ListItem
        disableGutters
        sx={{
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography variant="subtitle2">Total TTC</Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          MAD {total}
        </Typography>
      </ListItem>
    </List>
  );
};
