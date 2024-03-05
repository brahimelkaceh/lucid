import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

interface NewPaymentProps {
  onSubmit: (formData: FormData) => void;
}

type Option = {
  text: string;
  value: number;
};

const salaries: Option[] = [
  { text: 'salary 1', value: 1 },
  { text: 'salary 2', value: 2 },
  { text: 'salary 3', value: 3 },
  { text: 'salary 4', value: 4 },
  { text: 'salary 5', value: 5 },
];

interface FormData {
  salary: number | null;
  amount: number | '';
  date: Date | null;
}

const NewPayment: FC<NewPaymentProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number | ''>(0);
  const [selectedSalary, setSelectedSalary] = useState<Option | null>(null);
  const [date, setDate] = useState<Date | null>(new Date());

  const handleSalaryChange = (event: React.ChangeEvent<{}>, value: Option | null) => {
    setSelectedSalary(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Convert the input value to a number or set to an empty string if not a valid number
    const newValue: number | '' = /^\d+$/.test(inputValue) ? Number(inputValue) : '';

    setAmount(newValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData: FormData = {
        amount,
        salary: selectedSalary ? selectedSalary.value : null,
        date,
      };

      console.log(formData);

      onSubmit(formData);
    } catch (error) {
      console.error('Submission failed:', error);
    }
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
            <Autocomplete
              getOptionLabel={(option: Option) => option.text}
              options={salaries}
              onChange={handleSalaryChange}
              value={selectedSalary}
              renderInput={(params): JSX.Element => (
                <TextField
                  {...params}
                  fullWidth
                  label="Choisir un(e) salarié(e)"
                  name="salary"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Montant"
              name="amount"
              required
              type="number"
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
              label="Date de versement"
              onChange={(newDate) => setDate(newDate)}
              value={date}
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

export default NewPayment;
