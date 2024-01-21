import type { ChangeEvent, FC, MouseEvent } from 'react';
import { Fragment, useCallback, useState } from 'react';
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
import type { Product } from 'src/types/product';

interface ProductListTableProps {
  count?: number;
  items?: Product[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  rowsPerPage?: number;
}

export const ItemsListTable: FC<ProductListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;
  const [currentProduct, setCurrentProduct] = useState<string | null>(null);
  const [isCreatOn, setCreateOn] = useState(false);

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

  return (
    <div>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="flex-start"
      ></Stack>

      <CardContent>
        <Grid
          container
          spacing={0}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Grid
              container
              spacing={1}
            >
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Description"
                  name="name"
                />
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Prix unité"
                  name="sku"
                />
              </Grid>

              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Forfait"
                  type="number"
                  name="quantity"
                ></TextField>
              </Grid>
              <Grid
                item
                md={2}
                xs={12}
              >
                <Stack
                  alignItems="end"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Ajouter
                  </Button>
                  <Button
                    color="warning"
                    variant="outlined"
                    onClick={() => {
                      setCreateOn(false);
                    }}
                  >
                    Effacer
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Scrollbar>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell width="25%">Description</TableCell>
              <TableCell width="25%">Forfait</TableCell>
              <TableCell>Prix unité</TableCell>
              <TableCell>Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((product) => {
              const isCurrent = product.id === currentProduct;
              const price = numeral(product.price).format(`${product.currency}0,0.00`);

              return (
                <Fragment key={product.id}>
                  <TableRow
                    hover
                    key={product.id}
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
                      <IconButton onClick={() => handleProductToggle(product.id)}>
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
                          <Typography variant="subtitle2">{product.name}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell width="25%">
                      <Typography
                        color="text.secondary"
                        variant="body2"
                      >
                        {product.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>{price}</TableCell>
                    {/* <TableCell align="right">
                      <IconButton>
                        <SvgIcon>
                          <DotsHorizontalIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell> */}
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
                              <Typography variant="h6">Modifier l'item</Typography>
                              <Divider sx={{ my: 2 }} />
                              <Grid
                                container
                                spacing={3}
                              >
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={product.name}
                                    fullWidth
                                    label="Description"
                                    name="name"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={product.price}
                                    fullWidth
                                    label="Prix unité"
                                    name="sku"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                >
                                  <TextField
                                    defaultValue={product.quantity}
                                    fullWidth
                                    label="Quantité"
                                    type="number"
                                    name="quantity"
                                  ></TextField>
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
