import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Chip from '@mui/material/Chip';
import { Grid, Stack, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import FirebaseProjects from 'src/firebaseServices/projets';
import { Project } from 'src/types/project';
import toast from 'react-hot-toast';
import { paths } from 'src/paths';
import { useRouter } from 'next/router';

const firebaseNewProject = new FirebaseProjects();

const validationSchema = yup.object({
  project_name: yup.string().required('Nom projet est requis'),
});
const NewProject = () => {
  const [financialBackersInput, setFinancialBackersInput] = useState<string>('');
  const [financialBackersList, setFinancialBackersList] = useState<string[]>([]);
  const [beneficiaryInput, setBeneficiaryInput] = useState<string>('');
  const [beneficiaryList, setBeneficiaryList] = useState<string[]>([]);

  const handleFinancialBackersInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinancialBackersInput(event.target.value);
  };

  const handleAddFinancialBacker = () => {
    if (financialBackersInput.trim() !== '') {
      setFinancialBackersList([...financialBackersList, financialBackersInput.trim()]);
      setFinancialBackersInput('');
    }
  };

  const handleDeleteFinancialBacker = (index: number) => {
    const updatedList = [...financialBackersList];
    updatedList.splice(index, 1);
    setFinancialBackersList(updatedList);
  };

  const handleBeneficiaryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeneficiaryInput(event.target.value);
  };

  const handleAddBeneficiary = () => {
    if (beneficiaryInput.trim() !== '') {
      setBeneficiaryList([...beneficiaryList, beneficiaryInput.trim()]);
      setBeneficiaryInput('');
    }
  };

  const handleDeleteBeneficiary = (index: number) => {
    const updatedList = [...beneficiaryList];
    updatedList.splice(index, 1);
    setBeneficiaryList(updatedList);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      project_name: '',
      amount: 0,
      email: '',
      beneficiaries: beneficiaryList,
      financial_backer: financialBackersList,
      created_at: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      formik.values.beneficiaries = beneficiaryList;
      formik.values.financial_backer = financialBackersList;

      try {
        // Handle form submission
        await firebaseNewProject.createProject(values as unknown as Project);
        toast.success('Projet créé avec succès !');
        router.replace(paths.dashboard.projets.index);
        resetForm();
        setBeneficiaryList([]);
        setFinancialBackersList([]);
      } catch (error) {
        toast.error('Erreur lors de la création du projet!');
        console.error('Erreur lors de la création du projet!: ', error);
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
          spacing={4}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              fullWidth
              label="Nom Projet"
              name="project_name"
              required
              size="small"
              value={formik.values.project_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.project_name && Boolean(formik.errors.project_name)}
              helperText={formik.touched.project_name && formik.errors.project_name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              fullWidth
              label="Email de contact"
              name="email"
              type="email"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <TextField
                fullWidth
                label="Bailleur de fond"
                name="financial_backer"
                size="small"
                value={financialBackersInput}
                onChange={handleFinancialBackersInputChange}
              />
              <IconButton onClick={handleAddFinancialBacker}>
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={1}
              sx={{
                flexGrow: 1,
                pt: financialBackersList?.length > 0 ? 1 : 0,
              }}
            >
              {financialBackersList.map((backer, index) => (
                <Chip
                  key={index}
                  label={backer}
                  onDelete={() => handleDeleteFinancialBacker(index)}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <TextField
                fullWidth
                label="Bénéficiare"
                name="beneficiaries"
                size="small"
                value={beneficiaryInput}
                onChange={handleBeneficiaryInputChange}
              />
              <IconButton onClick={handleAddBeneficiary}>
                <SvgIcon>
                  <PlusIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={1}
              sx={{
                flexGrow: 1,
                pt: 1,
              }}
            >
              {beneficiaryList.map((beneficiary, index) => (
                <Chip
                  key={index}
                  label={beneficiary}
                  onDelete={() => handleDeleteBeneficiary(index)}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Montant Global"
              name="amount"
              type="number"
              size="small"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Création en cours...' : 'Créer un projet'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewProject;
