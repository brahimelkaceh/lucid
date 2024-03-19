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
import { SeverityPill } from 'src/components/severity-pill';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import Edit02 from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteConfirmationModal from '../components/delete-confirmation';
import toast from 'react-hot-toast';

interface ExpenseListTableProps {
  count?: number;
  items?: Customer[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  page?: number;
  rowsPerPage?: number;
}

const ExpenseListTable: FC<ExpenseListTableProps> = (props) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };
  // Replace this with your actual delete function
  const handleDelete = async (projectId: string | undefined) => {
    // Implement the delete logic here
    try {
      toast.success('Le frais a été supprimé avec succès!');
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Échec de la suppression du frais. Veuillez réessayer.');
    }
  };
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
            <TableCell>Projet</TableCell>
            <TableCell>Salarié</TableCell>
            <TableCell>Date </TableCell>
            <TableCell>montant</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Editer/Valider</TableCell>
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
                  <Typography variant="body2">
                    <SeverityPill color={1 < 2 ? 'error' : 'info'}>
                      {1 < 2 ? ' En Attente' : 'Validé'}
                    </SeverityPill>
                  </Typography>
                </TableCell>

                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick()} // Replace handleDelete with your actual delete function
                  >
                    <SvgIcon>
                      <DeleteOutlineIcon />
                    </SvgIcon>
                  </IconButton>
                  {/* <IconButton
                    color="info"
                    onClick={() => onSelect?.(member.id)}
                  >
                    <SvgIcon>
                      < />
                    </SvgIcon>
                  </IconButton> */}
                  <IconButton
                    component={RouterLink}
                    href={paths.dashboard.expenses.edit}
                    color="warning"
                  >
                    <SvgIcon>
                      <Edit02 />
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
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={handleDeleteCancel}
        message="Êtes vous sûr de vouloir supprimer le frais? Cette action sera irréversible."
      />
    </div>
  );
};
export default ExpenseListTable;
ExpenseListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
