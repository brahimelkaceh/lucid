import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface NewCustomerFormProps {
  onSubmit: (formData: NewCustomerFormData) => void;
}

interface NewCustomerFormData {
  fullName: string;
  ice: number;
  address: string;
  billingId: string;
}

const NewCustomerForm: FC<NewCustomerFormProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState<string>('');
  const [ice, setICE] = useState<number | ''>('');
  const [address, setAddress] = useState<string>('');
  const [billingId, setBillingId] = useState<string>('');

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleICEChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const newValue: number | '' = /^\d+$/.test(inputValue) ? Number(inputValue) : '';
    setICE(newValue);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleBillingIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: NewCustomerFormData = {
      fullName,
      ice: Number(ice), // Ensure ice is a number
      address,
      billingId,
    };
    console.log(formData);
    onSubmit(formData);
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
              label="Nom et prénom"
              name="fullName"
              required
              size="small"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Numéro de téléphone"
              name="billingId"
              type="tel"
              required
              size="small"
              value={billingId}
              onChange={handleBillingIdChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="ICE"
              name="ice"
              type="number"
              required
              size="small"
              value={ice}
              onChange={handleICEChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Adresse"
              name="address"
              required
              size="small"
              value={address}
              onChange={handleAddressChange}
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

export default NewCustomerForm;
