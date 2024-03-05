import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';

import { IconButton, SvgIcon, TableHead } from '@mui/material';
import { Customer } from 'src/types/customer';

interface OrderListTableProps {
  count?: number;
  items?: Customer[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
}

export const OrderListTable: FC<OrderListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom et prénom</TableCell>
            <TableCell>ICE</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell>numéro de téléphone</TableCell>
            <TableCell>Détails</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((member) => {
            return (
              <TableRow
                hover
                key={member.id}
              >
                <TableCell>
                  <Typography variant="subtitle2">{member.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{member.updatedAt}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.id.slice(10)}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton color="error">
                    <SvgIcon>
                      <DeleteOutlineIcon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => onSelect?.(member.id)}
                  >
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

OrderListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
