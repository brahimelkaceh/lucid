import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Autocomplete, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

interface NewMemberFormProps {
  onSubmit: (formData: NewMemberFormData) => void;
}
type PaymentMethod = {
  text: string;
  value: number;
};

const methods: PaymentMethod[] = [
  {
    text: 'method 1',
    value: 1,
  },
  {
    text: 'method 2',
    value: 2,
  },
];

interface NewMemberFormData {
  memberId: string;
  rdc: string;
  paymentMethod: PaymentMethod | null;
  total: number | '';
  date: Date | null;
}

const NewMemberForm: FC<NewMemberFormProps> = ({ onSubmit }) => {
  const [memberId, setMemberId] = useState<string>('');
  const [rdc, setRdc] = useState<string | ''>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [total, setTotal] = useState<number | ''>(''); // Type number or empty string
  const [date, setStartDate] = useState<Date | null>(new Date());

  const handleMemberIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(event.target.value);
  };

  const handleRdcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRdc(event.target.value);
  };

  const handleTotalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Convert the input value to a number or set to an empty string if not a valid number
    const newValue: number | '' = /^\d+$/.test(inputValue) ? Number(inputValue) : '';

    setTotal(newValue);
  };
  const handlepaymentMethodChange = (event: React.ChangeEvent<{}>, value: PaymentMethod | null) => {
    setPaymentMethod(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: NewMemberFormData = {
      memberId,
      rdc, // Ensure Rdc is a number
      paymentMethod,
      total,
      date,
    };
    console.log(formData);
    onSubmit(formData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="ID Membre"
              name="MemberId"
              required
              size="small"
              value={memberId}
              onChange={handleMemberIdChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Registre de Commerce"
              name="Rdc"
              required
              size="small"
              value={rdc}
              onChange={handleRdcChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={3}
            >
              <Autocomplete
                fullWidth
                getOptionLabel={(option: PaymentMethod) => option.text}
                options={methods}
                onChange={handlepaymentMethodChange}
                value={paymentMethod}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Moyen de paiement"
                    name="paymentMethod"
                  />
                )}
              />
              <TextField
                fullWidth
                label="MONTANT"
                name="total"
                type="number"
                size="small"
                value={total}
                onChange={handleTotalChange}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <MobileDatePicker
              label="Date"
              onChange={(newDate) => setStartDate(newDate)}
              value={date}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
          >
            Créer un membre
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewMemberForm;
