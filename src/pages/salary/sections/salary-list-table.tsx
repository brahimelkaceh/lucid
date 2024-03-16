import { useState, type ChangeEvent, type FC, type MouseEvent } from 'react';
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
import { format } from 'date-fns';
import DeleteConfirmationModal from './delete-confirmation';
import toast from 'react-hot-toast';

interface SalaryListTableProps {
  count?: number;
  items?: Customer[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
}

const SalaryListTable: FC<SalaryListTableProps> = (props) => {
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
            <TableCell>Nom du salarié</TableCell>
            <TableCell>Fonction</TableCell>
            <TableCell>Date de recrutement</TableCell>
            <TableCell>Salaire Brut</TableCell>
            <TableCell>Détails</TableCell>
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
                  <Typography variant="subtitle2">{member.state}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{date}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{totalAmount}</Typography>
                </TableCell>

                <TableCell>
                  {/* <IconButton color="error">
                    <SvgIcon>
                      <DeleteOutlineIcon />
                    </SvgIcon>
                  </IconButton> */}

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
export default SalaryListTable;
SalaryListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
