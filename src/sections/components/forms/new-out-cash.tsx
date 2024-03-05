import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete, FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

interface NewOutCashProps {
  onSubmit: (formData: FormData) => void;
}
type Option = {
  text: string;
  value: number;
};

const projects: Option[] = [
  { text: 'project id 1', value: 1 },
  { text: 'project id 2', value: 2 },
  { text: 'project id 3', value: 3 },
  { text: 'project id 4', value: 4 },
  { text: 'project id 5', value: 5 },
];
type Motif = {
  text: string;
  value: number;
};

const motifs: Motif[] = [
  { text: 'Notes de frais', value: 1 },
  { text: 'Utilities', value: 2 },
  { text: 'Achats & Prestataires', value: 3 },
];

interface FormData {
  amount: number | '';
  startDate: Date | null;
  motif: Motif | null;
}

const NewOutCash: FC<NewOutCashProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number | ''>(0);
  const [motif, setMotif] = useState<Motif | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create an object with the form data
    const formData: FormData = {
      startDate,
      amount,
      motif,
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
  const handleMotifChange = (event: React.ChangeEvent<{}>, value: Motif | null) => {
    setMotif(value);
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
            md={7}
          >
            <Autocomplete
              getOptionLabel={(option: Option) => option.text}
              options={motifs}
              onChange={handleMotifChange}
              value={motif}
              renderInput={(params): JSX.Element => (
                <TextField
                  {...params}
                  fullWidth
                  label="Motif"
                  name="projectId"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
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

export default NewOutCash;
