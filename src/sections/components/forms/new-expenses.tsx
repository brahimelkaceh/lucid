import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

interface NewExpensesProps {
  onSubmit: (formData: FormData) => void;
}
type Option = {
  text: string;
  value: number;
};
type Salaries = {
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
const salaries: Salaries[] = [
  { text: 'salary 1', value: 1 },
  { text: 'salary 2', value: 2 },
  { text: 'salary 3', value: 3 },
  { text: 'salary 4', value: 4 },
  { text: 'salary 5', value: 5 },
];
interface FormData {
  projectId: string;
  salaryId: string;
  startDate: Date | null;
  endDate: Date | null;
  amount: number | '';
}

const NewExpenses: FC<NewExpensesProps> = ({ onSubmit }) => {
  const [projectId, setProjectId] = useState<string>('');
  const [salaryId, setSalaryId] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [amount, setAmount] = useState<number | ''>(0);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create an object with the form data
    const formData: FormData = {
      projectId,
      salaryId,
      startDate,
      endDate,
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
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Nom projet"
              name="projectId"
              onChange={(event) => setProjectId(event.target.value)}
              value={projectId}
              select
              size="small"
            >
              <MenuItem value="">--</MenuItem>
              {projects?.map((project) => (
                <MenuItem
                  value={project.value}
                  key={project.value}
                >
                  {project.text}
                </MenuItem>
              ))}
              <MenuItem value={0}>autre</MenuItem>
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Salarié "
              name="salaryId"
              onChange={(event) => setSalaryId(event.target.value)}
              value={salaryId}
              select
              size="small"
            >
              <MenuItem value="">--</MenuItem>
              {salaries?.map((salary) => (
                <MenuItem
                  value={salary.value}
                  key={salary.value}
                >
                  {salary.text}
                </MenuItem>
              ))}
            </TextField>
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
                label="Montant"
                name="amount"
                type="number"
                required
                size="small"
                value={amount}
                onChange={handleAmountChange}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
          >
            <MobileDatePicker
              label="Date"
              onChange={(newDate) => setStartDate(newDate)}
              value={startDate}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
          >
            <MobileDatePicker
              label="Ajout date de fin"
              onChange={(newDate) => setEndDate(newDate)}
              value={endDate}
              disabled={!isSwitchOn}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isSwitchOn}
                  onChange={handleSwitchChange}
                  name="allDay"
                />
              }
              label=""
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

export default NewExpenses;
