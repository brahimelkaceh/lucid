import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Stack,
  SvgIcon,
  Switch,
  Typography,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useDialog } from 'src/hooks/use-dialog';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';
import { FileUploader } from 'src/pages/expenses/components/file-uploader';
import { SeverityPill } from 'src/components/severity-pill';

interface EditExpenseProps {
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

type ExpenseDetails = {
  text: string;
  value: string;
};

interface FormData {
  projectId: string;
  salaryId: string;
  startDate: Date | null;
  endDate: Date | null;
  amount: number | '';
}

const expenseDetails: ExpenseDetails[] = [
  { text: 'Transport', value: 'transport' },
  { text: 'Hébergement', value: 'hebergement' },
  { text: 'Repas', value: 'repas' },
  { text: 'Cadeaux & Représentations', value: 'gifts' },
  { text: 'Documentation', value: 'documentation' },
];

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

const EditExpense: FC<EditExpenseProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    projectId: '',
    salaryId: '',
    startDate: new Date(),
    endDate: new Date(),
    amount: 0,
  });
  const [isSwitchOn, setSwitchOn] = useState(false);
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked);
  };
  const [isValid, setValid] = useState(false);
  const handleValidChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValid(event.target.checked);
  };

  const uploadDialog = useDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedFormData = { ...formData, isValid }; // Include isValid in the formData

    console.log(updatedFormData);
    onSubmit(formData);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newValue: number | '' = /^\d+$/.test(inputValue) ? Number(inputValue) : '';
    setFormData({ ...formData, amount: newValue });
  };

  const renderExpenseDetails = (detail: ExpenseDetails) => (
    <Grid
      item
      xs={12}
      md={12}
      container
      spacing={4}
      key={detail.value}
    >
      <Grid
        item
        xs={12}
        md={4}
      >
        <SeverityPill color="info">{detail.text}</SeverityPill>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
      >
        <TextField
          fullWidth
          label="Montant"
          name="amount"
          type="number"
          required
          size="small"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
      >
        <Button
          onClick={uploadDialog.handleOpen}
          startIcon={
            <SvgIcon>
              <Upload01 />
            </SvgIcon>
          }
          color="secondary"
          variant="contained"
        >
          Télécharger
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Box maxWidth="lg">
          <Card>
            <CardContent>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Id Projet"
                    name="projectId"
                    onChange={(event) =>
                      setFormData({ ...formData, projectId: event.target.value })
                    }
                    value={formData.projectId}
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
                    onChange={(event) => setFormData({ ...formData, salaryId: event.target.value })}
                    value={formData.salaryId}
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
                  spacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                  >
                    <TextField
                      fullWidth
                      label="Montant"
                      name="amount"
                      type="number"
                      required
                      size="small"
                      value={formData.amount}
                      onChange={handleAmountChange}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                  >
                    <OutlinedInput
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Commentaire"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={2}
                  >
                    <MobileDatePicker
                      label="Date"
                      onChange={(newDate) => setFormData({ ...formData, startDate: newDate })}
                      value={formData.startDate}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={2}
                  >
                    <MobileDatePicker
                      label="Ajout date de fin"
                      onChange={(newDate) => setFormData({ ...formData, endDate: newDate })}
                      value={formData.endDate}
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

                {expenseDetails.map(renderExpenseDetails)}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={isValid}
                      onChange={handleValidChange}
                      name="allDay"
                    />
                  }
                  label="Validié"
                />
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Enregistrer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Stack>
      <FileUploader
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
      />
    </form>
  );
};

export default EditExpense;