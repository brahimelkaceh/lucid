import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete, FormControlLabel, Grid, MenuItem, Switch } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

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
  const formik = useFormik({
    initialValues: {
      amount: null,
      motif: '',
      startDate: new Date(),
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        toast.success('la nouvelle sortie créé avec succès !');
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création du nouvelle sortie!');
        console.error('Erreur lors de la création du nouvelle sortie!: ', error);
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
            md={7}
          >
            <TextField
              fullWidth
              label="Motif"
              name="motif"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.motif}
              select
            >
              <MenuItem
                value=""
                disabled
              >
                --
              </MenuItem>
              {motifs?.map((motif) => (
                <MenuItem
                  value={motif.value}
                  key={motif.value}
                >
                  {motif.text}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
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

export default NewOutCash;
