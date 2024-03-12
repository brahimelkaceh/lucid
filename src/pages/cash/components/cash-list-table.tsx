import type { ChangeEvent, FC, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { SeverityPill, type SeverityPillColor } from 'src/components/severity-pill';

import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';

import type { Order, OrderStatus } from 'src/types/order';
import { IconButton, SvgIcon, TableHead } from '@mui/material';
import { Customer } from 'src/types/customer';
import { format } from 'date-fns';

interface CashListTableProps {
  count?: number;
  items?: Customer[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
}
// Sorties: Notes de frais / Entretien et réparation / Achats et services
const CashListTable: FC<CashListTableProps> = (props) => {
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
            <TableCell>Categorie</TableCell>
            <TableCell>Montant</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((member, i) => {
            const totalAmount = numeral(member.totalSpent).format(`0,0.00`);

            return (
              <TableRow
                hover
                key={member.id}
              >
                <TableCell>
                  <Typography variant="subtitle2">
                    {i < 2 && 'Entretien et réparation'}
                    {i > 2 && 'Achats et services'}
                    {i == 2 && 'Notes de frais'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{totalAmount}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">30/01/2024</Typography>
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
export default CashListTable;
CashListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
