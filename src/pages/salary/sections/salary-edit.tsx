import { useState, type FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Customer } from 'src/types/customer';
import { DatePicker } from '@mui/x-date-pickers';
import { toDate } from 'date-fns';
import { FormControlLabel, Switch } from '@mui/material';

interface SalaryEditProps {
  onCancel?: () => void;
  onSave?: () => void;
  member: Customer;
}

const SalaryEdit: FC<SalaryEditProps> = (props) => {
  const { onCancel, onSave, member } = props;

  const dateFromTimestamp = member.updatedAt && toDate(member.updatedAt);
  // const [value, setValue] = useState<Date | null>(dateFromTimestamp ?? null);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6">Détails</Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nom du salarié"
            name="number"
            value={member.name}
          />
          <TextField
            fullWidth
            label="Fonction"
            name="fonction"
            value={member.state}
          />

          <TextField
            fullWidth
            label="Salaire Brut"
            name="amount"
            type="number"
            value={member.totalSpent}
          />
          <DatePicker
            label="Date de recrutement"
            // value={value} // Cast to DateValue
            // onChange={(newValue) => setValue(newValue)}
            format="dd/MM/yyyy"
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
export default SalaryEdit;
SalaryEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  member: PropTypes.object,
};
