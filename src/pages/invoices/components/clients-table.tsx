// ClientsTable.tsx
import React from 'react';
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Link,
} from '@mui/material';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Scrollbar } from 'src/components/scrollbar';
import numeral from 'numeral';
import { format } from 'date-fns';
import { Invoice } from 'src/types/invoice';

interface ClientsTableProps {
  clients: Invoice[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={2}
          sx={{ p: 2 }}
        >
          <OutlinedInput
            placeholder="Rechercher"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ flexGrow: 1 }}
          />
        </Stack>
        <Scrollbar>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Nom et prénom</TableCell>
                <TableCell>ICE</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>ID Facturation</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {clients.map((client) => {
                const location = `${client.city}, ${client.state}, ${client.country}`;
                const date = format(client.updatedAt, 'dd MMM, yyyy');

                return (
                  <TableRow
                    hover
                    key={client.id}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                      >
                        <div>
                          <Link
                            color="inherit"
                            variant="subtitle2"
                          >
                            {client.name}
                          </Link>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>{client.id.slice(15)}</TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>{client.id.slice(-14, 20)}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell align="right">
                      <IconButton color="warning">
                        <SvgIcon>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton color="error">
                        <SvgIcon>
                          <DeleteOutlineIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton color="info">
                        <SvgIcon>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })} */}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={clients.length}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Lignes par page"
        />
      </Card>
    </Box>
  );
};

export default ClientsTable;
