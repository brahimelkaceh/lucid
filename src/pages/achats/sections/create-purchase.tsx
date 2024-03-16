import { useState, type FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { Autocomplete, Divider, OutlinedInput, SvgIcon } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useDialog } from 'src/hooks/use-dialog';
import { number } from 'prop-types';
import FileUploader from '../components/file-uploader';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import CreateConfirmation from '../components/create-confirmation';

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
interface FormValues {
  projectId: number | null;
  nom: string;
  ice: string;
  depositedDate: Date | null;
  dueDate: Date | null;
  amount: number | null;
  status: string;
  method: string;
  commentaire: string;
}

const PurchaseCreateForm: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleOpen = () => {
    // Add logic to Update the selected invoice
    setOpen(true);
  };
  const handleCreateCancel = () => {
    setOpen(false);
  };

  const uploadDialog = useDialog();

  const formik = useFormik({
    initialValues: {
      projectId: null,
      nom: '',
      ice: '',
      depositedDate: null,
      dueDate: null,
      amount: null,
      status: '',
      method: '',
      commentaire: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Handle form submission
        console.log(values);
        toast.success('le prestataire créé avec succès !');
        setOpen(false);
        resetForm();
      } catch (error) {
        toast.error('Erreur lors de la création du prestataire!');
        console.error('Erreur lors de la création du prestataire!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });
  return (
    <form>
      <Stack spacing={4}>
        <Box maxWidth="lg">
          <Card>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Id Projet"
                      name="projectId"
                      onChange={formik.handleChange}
                      value={formik.values.projectId}
                      select
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
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Nom / Raison sociale du prestataire"
                      name="nom"
                      onChange={formik.handleChange}
                      value={formik.values.nom}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="ICE"
                      name="ice"
                      onChange={formik.handleChange}
                      value={formik.values.ice}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={2}>
                    <DatePicker
                      format="dd/MM/yyyy"
                      label="Déposée le"
                      onChange={(newDate) => formik.setFieldValue('depositedDate', newDate)}
                      value={formik.values.depositedDate}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={2}>
                    <DatePicker
                      format="dd/MM/yyyy"
                      label="Due le"
                      onChange={(newDate) => formik.setFieldValue('dueDate', newDate)}
                      value={formik.values.dueDate}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Montant"
                      name="amount"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.amount}
                    />
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={0}>
                    <TextField
                      fullWidth
                      label="Moyen de paiement"
                      name="method"
                      onChange={formik.handleChange}
                      value={formik.values.method}
                      select
                    >
                      <MenuItem value={1}>Chèque</MenuItem>
                      <MenuItem value={2}>Virement</MenuItem>
                      <MenuItem value={3}>Carte</MenuItem>
                      <MenuItem value={4}>Espèce</MenuItem>
                    </TextField>
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <Stack spacing={0}>
                    <TextField
                      fullWidth
                      label="Statut"
                      name="status"
                      onChange={formik.handleChange}
                      value={formik.values.status}
                      select
                    >
                      <MenuItem value="paid">Reglé</MenuItem>
                      <MenuItem value="canceld">Non reglé</MenuItem>
                      <MenuItem value="pending">En cours</MenuItem>
                    </TextField>
                  </Stack>
                </Grid>

                <Grid
                  xs={12}
                  md={8}
                >
                  <Stack spacing={0}>
                    <Typography
                      sx={{ mb: 1 }}
                      variant="subtitle2"
                    >
                      Commentaire
                    </Typography>
                    <OutlinedInput
                      fullWidth
                      multiline
                      rows={6}
                      name="commentaire"
                      onChange={formik.handleChange}
                      value={formik.values.commentaire}
                    />
                  </Stack>
                </Grid>
                <Divider />
              </Grid>
            </CardContent>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="flex-end"
              spacing={1}
              m={3}
            >
              <Button
                onClick={uploadDialog.handleOpen}
                startIcon={
                  <SvgIcon>
                    <Upload01Icon />
                  </SvgIcon>
                }
                color="secondary"
                variant="contained"
              >
                Télécharger
              </Button>
              <Button
                // type="submit"
                variant="contained"
                onClick={handleOpen}
              >
                Enregistrer
              </Button>
            </Stack>
          </Card>
        </Box>
      </Stack>
      <FileUploader
        onClose={uploadDialog.handleClose}
        open={uploadDialog.open}
      />
      <CreateConfirmation
        isOpen={isOpen}
        onConfirm={formik.handleSubmit}
        onCancel={handleCreateCancel}
      />
    </form>
  );
};
export default PurchaseCreateForm;
