import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Autocomplete, MenuItem } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      amount: '',
      salary: '',
      date: new Date(),
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);

      try {
        // Handle form submission
        toast.success('Nouveau virement créé avec succès !');
        router.replace(paths.dashboard.salary.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création un nouveau virement!');
        console.error('Erreur lors de la création un nouveau virement!: ', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
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
              label="Choisir un(e) salarié(e)"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
              select
              size="small"
            >
              <MenuItem disabled> --</MenuItem>
              {salaries?.map((salary) => (
                <MenuItem
                  key={salary?.value}
                  value={salary?.value}
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
          >
            <TextField
              fullWidth
              label="Montant"
              name="amount"
              required
              type="number"
              size="small"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <MobileDatePicker
              label="Date de versement"
              onChange={(newDate) => formik.setFieldValue('date', newDate)}
              value={formik.values.date}
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
