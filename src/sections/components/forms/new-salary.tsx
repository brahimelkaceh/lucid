import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Chip from '@mui/material/Chip';
import { Grid, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { MobileDatePicker } from '@mui/x-date-pickers';

interface NewSalaryProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  salaryName: string;
  fonction: string;
  startDate: Date | null;
  salary: number | '';
}

const NewSalary: FC<NewSalaryProps> = ({ onSubmit }) => {
  const [salaryName, setSalaryName] = useState<string>('');
  const [fonction, setFonction] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [salary, setSalary] = useState<number | ''>(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create an object with the form data
    const formData: FormData = {
      salaryName,
      fonction,
      startDate,
      salary,
    };
    // Log the form data to the console
    console.log(formData);
    onSubmit(formData);
  };
  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Convert the input value to a number or set to an empty string if not a valid number
    const newValue: number | '' = /^\d+$/.test(inputValue) ? Number(inputValue) : '';

    setSalary(newValue);
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
              label="Nom de salarié(e)"
              name="salaryName"
              required
              size="small"
              value={salaryName}
              onChange={(event) => setSalaryName(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Fonction"
              name="fonction"
              required
              size="small"
              value={fonction}
              onChange={(event) => setFonction(event.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              md={8}
            >
              <TextField
                fullWidth
                label="Salaire Brut"
                name="salary"
                type="number"
                required
                size="small"
                value={salary}
                onChange={handleSalaryChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <MobileDatePicker
                label="Date de recrutement"
                onChange={(newDate) => setStartDate(newDate)}
                value={startDate}
              />
            </Grid>
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

export default NewSalary;
