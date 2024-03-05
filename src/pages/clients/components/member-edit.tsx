import { useState, type FC } from 'react';
import PropTypes from 'prop-types';
import { format, toDate } from 'date-fns';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Customer } from 'src/types/customer';
import { DatePicker } from '@mui/x-date-pickers';

interface MemberEditProps {
  onCancel?: () => void;
  onSave?: () => void;
  member: Customer;
}

export const MemberEdit: FC<MemberEditProps> = (props) => {
  const { onCancel, onSave, member } = props;

  const dateFromTimestamp = member.updatedAt && toDate(member.updatedAt);
  const [value, setValue] = useState<Date | null>(dateFromTimestamp);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6">Détails</Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nom et prénom"
            name="number"
            value={member.name}
          />
          <TextField
            fullWidth
            label="ICE"
            name="email"
            value={member.updatedAt}
          />
          <TextField
            fullWidth
            label="Adresse"
            name="customer_name"
            value={member.email}
          />
          <TextField
            fullWidth
            label="Numéro de téléphone"
            name="payment_method"
            SelectProps={{ native: true }}
            value={member.id.slice(10)}
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
            Sauvegarder
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
