import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { OutlinedInput, Switch } from '@mui/material';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

const CreateNewItem = () => {
  const formik = useFormik({
    initialValues: {
      description: '',
      price: '',
      quantity: '',
    },
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        // NOTE: Make API request
        toast.success('Le item a été ajouté avec succès.');
        formik.resetForm();
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <CardContent>
      <Grid
        item
        md={12}
        xs={12}
      >
        <Typography
          sx={{ mb: 1 }}
          variant="subtitle2"
        >
          Description
        </Typography>
        <form>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <OutlinedInput
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
              container
              spacing={2}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Prix unité"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Quantité"
                  type="number"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                ></TextField>
              </Grid>
            </Grid>
            <Grid
              item
              md={2}
              xs={12}
            >
              <Stack
                alignItems="end"
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Ajouter
                </Button>
                <Button
                  color="warning"
                  variant="outlined"
                >
                  Effacer
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </CardContent>
  );
};

export default CreateNewItem;
