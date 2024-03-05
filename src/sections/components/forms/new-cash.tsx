import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

interface NewCashProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  amount: number | '';
  startDate: Date | null;
}

const NewCash: FC<NewCashProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number | ''>(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create an object with the form data
    const formData: FormData = {
      startDate,
      amount,
    };
    // Log the form data to the console
    console.log(formData);
    onSubmit(formData);
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Convert the input value to a number or set to an empty string if not a valid number
    const newValue: number | '' = /^\d+$/.test(inputValue) ? Number(inputValue) : '';

    setAmount(newValue);
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
            container
          >
            <TextField
              fullWidth
              label="Montant"
              name="amount"
              type="number"
              required
              size="small"
              value={amount}
              onChange={handleAmountChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
          >
            <MobileDatePicker
              label="Date"
              onChange={(newDate) => setStartDate(newDate)}
              value={startDate}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
          >
            Créer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewCash;
