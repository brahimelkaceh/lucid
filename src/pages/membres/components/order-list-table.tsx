import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { SeverityPillColor } from 'src/components/severity-pill';

import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import type { Order, OrderStatus } from 'src/types/order';
import { IconButton, SvgIcon, TableHead } from '@mui/material';
import { Customer } from 'src/types/customer';
import { format } from 'date-fns';

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
            <TableCell>registre de commerce</TableCell>
            <TableCell>Moyen de paiement</TableCell>
            <TableCell>montant</TableCell>
            <TableCell>Paiements projets</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((member) => {
            const totalAmount = numeral(member.totalSpent).format(`0,0.00`);
            const date = member.updatedAt && format(member.updatedAt, 'dd/MM/yyyy');

            return (
              <TableRow
                hover
                key={member.id}
              >
                <TableCell>
                  <Typography variant="subtitle2">{member.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.updatedAt}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.city}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">MAD {totalAmount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">MAD {totalAmount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{date}</Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="warning"
                    onClick={() => onSelect?.(member.id)}
                  >
                    <SvgIcon>
                      <Edit02Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton color="error">
                    <SvgIcon>
                      <DeleteOutlineIcon />
                    </SvgIcon>
                  </IconButton>{' '}
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
