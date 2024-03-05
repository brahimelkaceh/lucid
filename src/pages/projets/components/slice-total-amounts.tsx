import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import TrendUp02Icon from '@untitled-ui/icons-react/build/esm/TrendUp02';
import TrendDown02Icon from '@untitled-ui/icons-react/build/esm/TrendDown02';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

interface SlicesTotalAmountsProps {
  slicesTotal: number | null;
}

export const SlicesTotalAmounts: FC<SlicesTotalAmountsProps> = (props) => {
  const { slicesTotal } = props;
  console.log(slicesTotal);

  return (
    <Card
      sx={{
        pb: 2,
      }}
    >
      <CardHeader title="Total reçu" />
      <Divider variant="middle" />
      <List disablePadding>
        <ListItem>
          <ListItemText>
            <Typography variant="subtitle2">Total</Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <Typography variant="subtitle2">MAD {slicesTotal}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Card>
  );
};

SlicesTotalAmounts.propTypes = {
  slicesTotal: PropTypes.number.isRequired,
};
