import React, { ChangeEvent, FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { MenuItem, Stack } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { SeverityPill } from 'src/components/severity-pill';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Member } from 'src/types/members';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';
import FirebaseMembers from 'src/firebaseServices/membres';

type PaymentMethod = {
  text: string;
  value: number;
};

const methods: PaymentMethod[] = [
  {
    text: 'Chèque',
    value: 1,
  },
  {
    text: 'Virement',
    value: 2,
  },
  {
    text: 'Carte',
    value: 3,
  },
  {
    text: 'Espèce',
    value: 4,
  },
];

const validationSchema = yup.object({
  full_name: yup.string().required('Nom membre est requis'),
  email: yup.string().required('Email est requis').email('Format email invalide'),
  rc_cin: yup.string().required('CIN/Registre de Commerce est requis'),
  status: yup.string().required('Statut est requis'),
});
const firebaseNewMember = new FirebaseMembers();

const NewMemberForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      rc_cin: '',
      status: '',
      payment_method: null,
      amount: 0,
      payment_date: new Date(),
      created_at: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      formik.values.full_name = values.full_name.toLowerCase();
      if (values.status === 'unpaid') {
        formik.values.payment_date = new Date(0);
        formik.values.amount = 0;
        formik.values.payment_method = null;
      }
      try {
        // Handle form submission
        await firebaseNewMember.createMember(values as Member);
        toast.success('Membre créé avec succès !');
        router.replace(paths.dashboard.membres.index);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création du membre!');
        console.error('Erreur lors de la création du membre!: ', error);
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
              label="Nom membre"
              name="full_name"
              required
              size="small"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.full_name && Boolean(formik.errors.full_name)}
              helperText={formik.touched.full_name && formik.errors.full_name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              required
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Registre de Commerce"
              name="rc_cin"
              required
              size="small"
              value={formik.values.rc_cin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.rc_cin && Boolean(formik.errors.rc_cin)}
              helperText={formik.touched.rc_cin && formik.errors.rc_cin}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <TextField
              fullWidth
              label="Statut"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              select
              size="small"
            >
              <MenuItem value={'paid'}>
                <SeverityPill color="success">Payé</SeverityPill>
              </MenuItem>
              <MenuItem value={'unpaid'}>
                <SeverityPill color="error">Impayé</SeverityPill>
              </MenuItem>
            </TextField>
          </Grid>
          {formik.values.status == 'paid' && (
            <Grid
              item
              xs={12}
              md={12}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <TextField
                  fullWidth
                  label="Montant"
                  name="amount"
                  type="number"
                  size="small"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
                <TextField
                  fullWidth
                  label="Moyen de paiement"
                  name="payment_method"
                  value={formik.values.payment_method}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.payment_method && Boolean(formik.errors.payment_method)}
                  helperText={formik.touched.payment_method && formik.errors.payment_method}
                  select
                  size="small"
                >
                  {methods.map((method) => (
                    <MenuItem
                      key={method.value}
                      value={method.value}
                    >
                      {method.text}
                    </MenuItem>
                  ))}
                </TextField>
                <Grid
                  item
                  xs={6}
                  md={6}
                >
                  <MobileDatePicker
                    label="Date de paiement"
                    onChange={(newDate) => formik.setFieldValue('payment_date', newDate)}
                    value={formik.values.payment_date}
                  />
                </Grid>
              </Stack>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Création en cours...' : 'Créer un membre'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewMemberForm;
