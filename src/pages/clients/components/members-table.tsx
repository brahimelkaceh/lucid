// MembersTable.tsx
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
import type { Member } from '../index';
import { format } from 'date-fns';

interface MembersTableProps {
  members: Member[];
}

const MembersTable: React.FC<MembersTableProps> = ({ members }) => {
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
                <TableCell>Registre de Commerce</TableCell>
                <TableCell>Moyen de paiement</TableCell>
                <TableCell>Montant</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => {
                const location = `${member.city}, ${member.state}, ${member.country}`;
                const totalSpent = numeral(member.totalSpent).format(`${member.currency} 0,0.00`);
                const date = format(member.updatedAt, 'dd MMM, yyyy');

                return (
                  <TableRow
                    hover
                    key={member.id}
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
                            {member.name}
                          </Link>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>{member.id.slice(15)}</TableCell>
                    <TableCell>{location}</TableCell>
                    <TableCell>MAD {totalSpent}</TableCell>
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
              })}
            </TableBody>
          </Table>
        </Scrollbar>
        <TablePagination
          component="div"
          count={members.length}
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

export default MembersTable;
