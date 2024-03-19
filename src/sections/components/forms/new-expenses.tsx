import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  projectId: Yup.string().required('Nom projet est requis'),
  salaryId: Yup.string().required('Salarié est requis'),
  amount: Yup.number().required('Montant est requis').positive('Le montant doit être positif'),
});
interface Option {
  text: string;
  value: number;
}

const projects: Option[] = [
  { text: 'project id 1', value: 1 },
  { text: 'project id 2', value: 2 },
  { text: 'project id 3', value: 3 },
  { text: 'project id 4', value: 4 },
  { text: 'project id 5', value: 5 },
];

const salaries: Option[] = [
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

const NewExpenses: FC = () => {
  const router = useRouter();
  const [isSwitchOn, setSwitchOn] = useState(false);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked);
  };

  const formik = useFormik<FormData>({
    initialValues: {
      projectId: '',
      salaryId: '',
      amount: '',
      startDate: new Date(),
      endDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);

        toast.success('Nouveaux frais créés avec succès !');
        router.replace(paths.dashboard.expenses.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création des nouveaux frais!');
        console.error('Erreur lors de la création des nouveaux frais!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
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
              value={formik.values.projectId}
              onChange={formik.handleChange}
              select
              size="small"
              error={formik.touched.projectId && Boolean(formik.errors.projectId)}
              helperText={formik.touched.projectId && formik.errors.projectId}
            >
              <MenuItem value="">--</MenuItem>
              {projects.map((project) => (
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
              label="Salarié"
              name="salaryId"
              value={formik.values.salaryId}
              onChange={formik.handleChange}
              select
              size="small"
              error={formik.touched.salaryId && Boolean(formik.errors.salaryId)}
              helperText={formik.touched.salaryId && formik.errors.salaryId}
            >
              <MenuItem value="">--</MenuItem>
              {salaries.map((salary) => (
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
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
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
              onChange={(newDate) => formik.setFieldValue('startDate', newDate)}
              value={formik.values.startDate}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
          >
            <MobileDatePicker
              label="Ajout date de fin"
              onChange={(newDate) => formik.setFieldValue('endDate', isSwitchOn ? newDate : null)}
              value={formik.values.endDate}
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
