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
import FileUploader from 'src/pages/expenses/components/file-uploader';
import { SeverityPill } from 'src/components/severity-pill';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';

const validationSchema = Yup.object().shape({
  projectId: Yup.string().required('Nom projet est requis'),
  salaryId: Yup.string().required('Salarié est requis'),
  amount: Yup.number().required('Montant est requis').positive('Le montant doit être positif'),
});

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
  comment: string;
  startDate: Date | null;
  endDate: Date | null;
  amount: number | '';
  isValid: boolean;
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

const EditExpense: FC = () => {
  const router = useRouter();

  const [isSwitchOn, setSwitchOn] = useState(false);
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchOn(event.target.checked);
  };

  const uploadDialog = useDialog();

  const formik = useFormik<FormData>({
    initialValues: {
      projectId: '',
      salaryId: '',
      amount: '',
      comment: '',
      startDate: new Date(),
      endDate: null,
      isValid: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);

        toast.success('Nouveaux frais modifié avec succès !');
        router.replace(paths.dashboard.expenses.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la modification des nouveaux frais!');
        console.error('Erreur lors de la modification des nouveaux frais!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });

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
    <form onSubmit={formik.handleSubmit}>
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
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      error={formik.touched.amount && Boolean(formik.errors.amount)}
                      helperText={formik.touched.amount && formik.errors.amount}
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
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                    />
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
                      onChange={(newDate) =>
                        formik.setFieldValue('endDate', isSwitchOn ? newDate : null)
                      }
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
                      name="isValid"
                      checked={formik?.values.isValid}
                      onChange={(e) => {
                        formik?.setFieldValue('isValid', e.target.checked);
                      }}
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
