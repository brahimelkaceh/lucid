import { useState, type FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import type { SeverityPillColor } from 'src/components/severity-pill';
import { SeverityPill } from 'src/components/severity-pill';
import { Scrollbar } from 'src/components/scrollbar';
import { Customer } from 'src/types/customer';
import PaymentHistoryTableRow from './PaymentHistoryTableRow';
import DeleteConfirmationModal from './delete-confirmation';
import toast from 'react-hot-toast';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Divider } from '@mui/material';

interface SalaryDetailsProps {
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  member: Customer;
}
interface PaymentHistory {
  date: string;
  amount: string;
  id: number;
}
const dummyData: PaymentHistory[] = [
  { id: 1, date: '12/05/2023', amount: 'MAD 300.00' },
  { id: 2, date: '15/06/2023', amount: 'MAD 500.00' },
  { id: 3, date: '20/07/2023', amount: 'MAD 700.00' },
  // Add more dummy data as needed
];

const SalaryDetails: FC<SalaryDetailsProps> = (props) => {
  const { onApprove, onEdit, onReject, member } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const date = member.updatedAt && format(member.updatedAt, 'dd/MM/yyyy');

  const align = lgUp ? 'horizontal' : 'vertical';

  const handleDeletePayment = (paymentId: number) => {
    // Handle the deletion logic here (e.g., make an API call)
    // For now, let's just log the paymentId
    console.log(`Deleting payment with ID: ${paymentId}`);
  };
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async (memberId: string | undefined) => {
    try {
      console.log('salarié avec id ', memberId, 'est supprimer');

      // await firebaseSlice.deleteSlice(projectId, sliceId, onRefresh);
      toast.success('Le salarié a été supprimé avec succès!');
      if (onReject) {
        onReject();
      }
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Échec de la suppression du salarié. Veuillez réessayer.');
    }
    setDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };
  return (
    <Stack spacing={6}>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDeleteConfirmation}
        onCancel={handleDeleteCancel}
        message="Êtes vous sûr de vouloir supprimer ce salarié(e)? Cette action sera irréversible."
        memberId={member?.id}
      />
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">Détails</Typography>
          <Stack
            flexDirection={'row'}
            gap={2}
          >
            <Button
              color="error"
              variant="text"
              onClick={handleDeleteClick}
              size="small"
              startIcon={
                <SvgIcon>
                  <DeleteOutline />
                </SvgIcon>
              }
            >
              Supprimer
            </Button>
            <Button
              color="warning"
              variant="outlined"
              onClick={onEdit}
              size="small"
              startIcon={
                <SvgIcon>
                  <Edit02Icon />
                </SvgIcon>
              }
            >
              Modifier
            </Button>
          </Stack>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Nom du salarié"
            value={member.name}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Fonction"
            value={member.state}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date de recrutement"
            value={date}
          />

          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Salaire Brut"
            value={'MAD ' + member.totalSpent + '.00'}
          />
        </PropertyList>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">Historique des virements</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Virement</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((payment) => (
                <PaymentHistoryTableRow
                  key={payment.id}
                  {...payment}
                  onDelete={() => handleDeletePayment(payment.id)}
                />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};
export default SalaryDetails;
SalaryDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
};
