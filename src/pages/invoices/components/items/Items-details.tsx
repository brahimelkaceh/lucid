import { useState, type FC, useEffect } from 'react';
import numeral from 'numeral';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Item, itemsApi } from '../../../../api/items/index';
import { FormControlLabel, Stack, Switch } from '@mui/material';

export const ItemsDetails: FC = () => {
  const [items, setItems] = useState<Item[]>([]); // Assuming you manage items state somehow
  const [isTvaActive, setIsTvaActive] = useState(true); // Set the initial state based on your logic

  const fetchItems = async () => {
    const response = await itemsApi.getItems();
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []); // Fetch items when the component mounts

  const totalHt = numeral(itemsApi.calculateTotalAmount(items)).format('0,0.00');

  // Conditionally set tva based on the isTvaActive state
  const tvaPercentage = isTvaActive ? 0.2 : 0;
  const tva = numeral(Number(totalHt) * tvaPercentage).format('0,0.00');

  const totalWithVat = numeral(Number(totalHt) + Number(tva)).format('0,0.00');

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
          MAD {totalHt}
        </Typography>
      </ListItem>
      <ListItem
        disableGutters
        divider
        sx={{
          justifyContent: 'space-between',
          padding: 1,
        }}
      >
        <Stack spacing={3}>
          <FormControlLabel
            control={
              <Switch
                checked={isTvaActive}
                onChange={() => setIsTvaActive(!isTvaActive)}
                name="allDay"
              />
            }
            label={isTvaActive ? 'TVA 20%' : 'EXO'}
          />
        </Stack>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          MAD {tva}
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
          MAD {totalWithVat}
        </Typography>
      </ListItem>
    </List>
  );
};
