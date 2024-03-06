import type { ChangeEvent, FC, MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Divider, OutlinedInput, SvgIcon } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { useDialog } from 'src/hooks/use-dialog';
import { FileUploader } from '../components/file-uploader';

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

export const PurchaseUpdateForm: FC = (props) => {
  const [depositedDate, setDepositedDate] = useState<Date | null>(new Date());
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

  const [formData, setFormData] = useState<FormValues>({
    projectId: null,
    nom: '',
    ice: '',
    depositedDate: null,
    dueDate: null,
    amount: null,
    status: '',
    method: '',
    commentaire: '',
  });

  const uploadDialog = useDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    //! Add logic for form submission here
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const parsedValue = name === 'amount' ? parseFloat(value) : value;

    setFormData((prevData) => ({ ...prevData, [name]: parsedValue, depositedDate, dueDate }));
  };

  return (
    <form>
      <Stack spacing={4}>
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
                        onChange={handleInputChange}
                        value={formData.projectId}
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
                        onChange={handleInputChange}
                        value={formData.nom}
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
                        onChange={handleInputChange}
                        value={formData.ice}
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
                        onChange={(newDate) => setDepositedDate(newDate)}
                        value={depositedDate}
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
                        onChange={(newDate) => setDueDate(newDate)}
                        value={dueDate}
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
                        onChange={handleInputChange}
                        value={formData.amount}
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
                        onChange={handleInputChange}
                        value={formData.method}
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
                        onChange={handleInputChange}
                        value={formData.status}
                        select
                      >
                        <MenuItem value="paid">Payé</MenuItem>
                        <MenuItem value="canceld">Impayé</MenuItem>
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
                        onChange={handleInputChange}
                        value={formData.commentaire}
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
                  type="submit"
                  variant="contained"
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
      </Stack>
    </form>
  );
};
