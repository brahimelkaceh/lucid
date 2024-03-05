import type { ChangeEvent, FC, MouseEvent } from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import numeral from 'numeral';
import { toast } from 'react-hot-toast';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Scrollbar } from 'src/components/scrollbar';
import { FormControlLabel, OutlinedInput, Switch } from '@mui/material';
import { itemsApi } from '../../../../api/items/index';
import { Item } from 'src/types/items';
import { CreateNewItem } from './create-new-item';

interface ItemListTableProps {
  count?: number;
  items?: Item[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
}

export const ItemsListTable: FC<ItemListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;
  const [currentProduct, setCurrentProduct] = useState<string | null>(null);
  const [isForfait, setForfait] = useState(false);
  const [itemsWithAmount, setItemsWithAmount] = useState<Item[]>([]);

  const handleForfaitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForfait(event.target.checked);
  };
  const handleProductToggle = useCallback((productId: string): void => {
    setCurrentProduct((prevProductId) => {
      if (prevProductId === productId) {
        return null;
      }

      return productId;
    });
  }, []);

  const handleProductClose = useCallback((): void => {
    setCurrentProduct(null);
  }, []);

  const handleProductUpdate = useCallback((): void => {
    setCurrentProduct(null);
    toast.success('Product updated');
  }, []);

  const handleProductDelete = useCallback((): void => {
    toast.error('Product cannot be deleted');
  }, []);
  const calculateAmountForItems = () => {
    const itemsWithAmount = items.map((item) => ({
      ...item,
      amount: itemsApi.calculateAmountForItem(item),
    }));
    setItemsWithAmount(itemsWithAmount);
  };

  useEffect(() => {
    calculateAmountForItems();
  }, [items]);
  return (
    <div>
      <CreateNewItem />
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="25%">Description</TableCell>
              <TableCell width="25%">Quantité</TableCell>
              <TableCell>Prix unité</TableCell>
              <TableCell align="right">Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsWithAmount.map((item) => {
              const isCurrent = item.id === currentProduct;
              const price = numeral(item.amount).format(`0,0.00`);

              return (
                <Fragment key={item.id}>
                  <TableRow
                    hover
                    key={item.id}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(isCurrent && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }),
                      }}
                      width="25%"
                    >
                      <IconButton onClick={() => handleProductToggle(item.id)}>
                        <SvgIcon>{isCurrent ? <ChevronDownIcon /> : <ChevronRightIcon />}</SvgIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell width="25%">
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Box
                          sx={{
                            cursor: 'pointer',
                            ml: 2,
                          }}
                        >
                          <Typography variant="subtitle2">{item.description}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell width="25%">
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {item.quantity}{' '}
                      </Typography>
                    </TableCell>

                    <TableCell>{item.price}</TableCell>
                    <TableCell align="right">{price}</TableCell>
                  </TableRow>
                  {isCurrent && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        sx={{
                          p: 0,
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }}
                      >
                        <CardContent>
                          <Grid
                            container
                            spacing={3}
                          >
                            <Grid
                              item
                              md={12}
                              xs={12}
                            >
                              <Typography variant="h6"> Modifier l'item</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={0}
                              >
                                <Grid
                                  item
                                  md={12}
                                  xs={12}
                                >
                                  <Typography
                                    sx={{ mb: 1 }}
                                    variant="subtitle2"
                                  >
                                    Description
                                  </Typography>
                                  <Grid
                                    container
                                    spacing={2}
                                  >
                                    <Grid
                                      item
                                      md={6}
                                      xs={12}
                                    >
                                      <OutlinedInput
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Description"
                                        defaultValue={item.description}
                                      />
                                    </Grid>

                                    <Grid
                                      item
                                      md={6}
                                      xs={12}
                                      container
                                      spacing={2}
                                    >
                                      <Grid
                                        item
                                        md={12}
                                        xs={12}
                                      >
                                        <TextField
                                          fullWidth
                                          label="Prix unité"
                                          name="sku"
                                          defaultValue={item.price}
                                        />
                                      </Grid>

                                      <Grid
                                        item
                                        md={12}
                                        xs={12}
                                      >
                                        <TextField
                                          fullWidth
                                          label="Quantité"
                                          type="number"
                                          name="quantity"
                                          defaultValue={item.quantity}
                                        ></TextField>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <Divider />
                        <Stack
                          alignItems="center"
                          direction="row"
                          justifyContent="space-between"
                          sx={{ p: 2 }}
                        >
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Button
                              onClick={handleProductUpdate}
                              type="submit"
                              variant="contained"
                            >
                              Enregistrer
                            </Button>
                            <Button
                              color="inherit"
                              onClick={handleProductClose}
                            >
                              Annuler
                            </Button>
                          </Stack>
                          <div>
                            <Button
                              onClick={handleProductDelete}
                              color="error"
                            >
                              Supprimer Item
                            </Button>
                          </div>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
      />
    </div>
  );
};
