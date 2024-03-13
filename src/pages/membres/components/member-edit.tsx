import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { MenuItem } from '@mui/material';
import { Member } from 'src/types/members';

interface MemberEditProps {
  onCancel?: () => void;
  onSave?: (id: string, values: Member) => void;
  member: Member;
}

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

const MemberEdit: React.FC<MemberEditProps> = ({ onCancel, onSave, member }) => {
  const { values, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      id: member.id,
      full_name: member.full_name,
      email: member.email,
      rc_cin: member.rc_cin,
      payment_method: member.payment_method,
      amount: member.amount,
      payment_date:
        // member.status === 'paid' ? member.payment_date && member.payment_date.toDate() : new Date(),
        member.status === 'paid' ? member.payment_date && member.payment_date : new Date(),
      status: member.status,
      updated_at: new Date(),
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: (formValues) => {
      if (formValues.status == 'unpaid') {
        formValues.payment_date = new Date(0);
        formValues.amount = 0;
        formValues.payment_method = null;
      }
      if (onSave) {
        onSave(formValues.id, formValues);
      }
    },
  });

  useEffect(() => {
    setFieldValue('id', member.id);
    setFieldValue('full_name', member.full_name);
    setFieldValue('email', member.email);
    setFieldValue('rc_cin', member.rc_cin);
    setFieldValue('payment_method', member.payment_method);
    setFieldValue('amount', member.amount);
    setFieldValue(
      'payment_date',
      // member.status === 'paid' ? member.payment_date && member.payment_date.toDate() : new Date()
      member.status === 'paid' ? member.payment_date && member.payment_date : new Date()
    );
    setFieldValue('status', member.status);
  }, [member, setFieldValue]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6}>
        <Stack spacing={3}>
          <Typography variant="h6">Détails</Typography>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nom et prénom"
              name="full_name"
              value={values.full_name}
              onChange={handleChange}
              error={touched.full_name && Boolean(errors.full_name)}
              helperText={touched.full_name && errors.full_name}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label="Registre de Commerce"
              name="rc_cin"
              value={values.rc_cin}
              onChange={handleChange}
              error={touched.rc_cin && Boolean(errors.rc_cin)}
              helperText={touched.rc_cin && errors.rc_cin}
            />
            <TextField
              fullWidth
              label="Status"
              name="status"
              select
              SelectProps={{ native: true }}
              value={values.status}
              onChange={handleChange}
              error={touched.status && Boolean(errors.status)}
              helperText={touched.status && errors.status}
            >
              {['paid', 'unpaid'].map((statusOption) => (
                <option
                  key={statusOption}
                  value={statusOption}
                >
                  {statusOption === 'paid' ? 'Payée' : 'Impayée'}
                </option>
              ))}
            </TextField>
            {values.status === 'paid' && (
              <>
                <TextField
                  fullWidth
                  label="Moyen de paiement"
                  name="payment_method"
                  select
                  SelectProps={{
                    native: true,
                  }}
                  value={values.payment_method}
                  onChange={handleChange}
                  error={touched.payment_method && Boolean(errors.payment_method)}
                  helperText={touched.payment_method && errors.payment_method}
                >
                  <option value={''}>--</option>
                  {methods.map((method) => (
                    <option
                      key={method.value}
                      value={method.value}
                    >
                      {method.text}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Montant"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
                <MobileDatePicker
                  label="Date de paiement"
                  onChange={(newDate) => setFieldValue('payment_date', newDate)}
                  value={values.payment_date}
                />
              </>
            )}
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            spacing={2}
          >
            <Button
              color="primary"
              type="submit"
              size="small"
              variant="contained"
            >
              Sauvegarder
            </Button>
            <Button
              color="error"
              onClick={onCancel}
              size="small"
            >
              Annuler
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};
export default MemberEdit;
MemberEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
};
