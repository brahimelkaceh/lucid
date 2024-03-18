import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

interface NewCashProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  amount: number | '';
  startDate: Date | null;
}

const NewCash: FC<NewCashProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      amount: null,
      startDate: new Date(),
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        toast.success('la nouvelle entrée créé avec succès !');
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création du Nouvelle Entrée!');
        console.error('Erreur lors de la création du Nouvelle Entrée!: ', error);
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
              label="Date"
              onChange={(newDate) => formik.setFieldValue('startDate', newDate)}
              value={formik.values.startDate}
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
