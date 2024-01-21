import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Customer } from 'src/types/customer';

const statusOptions = [
  {
    label: 'Canceled',
    value: 'canceled',
  },
  {
    label: 'Complete',
    value: 'complete',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
];

interface MemberEditProps {
  onCancel?: () => void;
  onSave?: () => void;
  member: Customer;
}

export const MemberEdit: FC<MemberEditProps> = (props) => {
  const { onCancel, onSave, member } = props;

  //   const createdAt = format(member.createdAt, 'dd/MM/yyyy HH:mm');

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6">Détails</Typography>
        <Stack spacing={3}>
          <TextField
            disabled
            fullWidth
            label="ID Membre"
            name="id"
            value={member.id}
          />
          <TextField
            fullWidth
            label="Nom et prénom"
            name="number"
            value={member.name}
          />
          <TextField
            fullWidth
            label="Registre de Commerce"
            name="customer_name"
            value={member.updatedAt}
          />
          <TextField
            fullWidth
            label="Moyen de paiement"
            name="status"
            select
            SelectProps={{ native: true }}
            value={member.city}
          >
            <option value="1">method 1</option>
            <option value="2">method 2</option>
            <option value="3">method 3</option>
            <option value="4">method 4</option>
          </TextField>
          <TextField
            fullWidth
            label="Montant"
            name="date"
            value={member.totalSpent}
          />
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          spacing={2}
        >
          <Button
            color="primary"
            onClick={onSave}
            size="small"
            variant="contained"
          >
            Sauvegarder les modifications
          </Button>
          <Button
            color="inherit"
            onClick={onCancel}
            size="small"
          >
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

MemberEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  member: PropTypes.object,
};
