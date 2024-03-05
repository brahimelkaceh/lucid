import { useState, type FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Chip, IconButton, SvgIcon } from '@mui/material';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Project } from 'src/types/project';
import { useFormik } from 'formik';
import * as Yup from 'yup';
interface ProjectEditProps {
  onCancel?: () => void;
  onSave?: (id: string, values: Project) => void;
  project: Project;
}

export const ProjectEdit: FC<ProjectEditProps> = (props) => {
  const { onCancel, onSave, project } = props;
  const [financialBackersInput, setFinancialBackersInput] = useState<string>('');
  const [financialBackersList, setFinancialBackersList] = useState<string[]>(
    project.financial_backer
  );
  const [beneficiaryInput, setBeneficiaryInput] = useState<string>('');
  const [beneficiaryList, setBeneficiaryList] = useState<string[]>(project.beneficiaries);

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

  const { values, handleChange, handleSubmit, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      id: '',
      project_name: '',
      email: '',
      amount: 0,
      beneficiaries: beneficiaryList,
      financial_backer: financialBackersList,
      updated_at: new Date(),
    },
    validationSchema: Yup.object({
      project_name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: (formValues) => {
      formValues.beneficiaries = beneficiaryList;
      formValues.financial_backer = financialBackersList;
      console.log(formValues.beneficiaries, beneficiaryList);

      if (onSave && formValues.id) {
        onSave(formValues.id, formValues);
      }
    },
  });

  useEffect(() => {
    setFieldValue('id', project.id);
    setFieldValue('project_name', project.project_name);
    setFieldValue('email', project.email);
    setFieldValue('amount', project.amount);
    setFinancialBackersList(project.financial_backer);
    setBeneficiaryList(project.beneficiaries);
  }, [project]);
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6}>
        <Stack spacing={3}>
          <Typography variant="h6">Détails du projet</Typography>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nom projet"
              name="project_name"
              value={values.project_name}
              onChange={handleChange}
              error={touched.project_name && Boolean(errors.project_name)}
              helperText={touched.project_name && errors.project_name}
            />
            <TextField
              fullWidth
              label="Email de Contact"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <TextField
                fullWidth
                label="BAILLEUR DE FOND"
                name="financialBackers"
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
            {financialBackersList && (
              <Stack
                alignItems="center"
                direction="row"
                flexWrap="wrap"
                spacing={0}
                sx={{
                  flexGrow: 1,
                  pt: financialBackersList?.length > 0 ? 1 : 0,
                  paddingTop: 0,
                }}
              >
                {financialBackersList.map((backer, index) => (
                  <Chip
                    key={index}
                    label={backer}
                    onDelete={() => handleDeleteFinancialBacker(index)}
                    variant="outlined"
                    sx={{
                      margin: 0.5,
                    }}
                  />
                ))}
              </Stack>
            )}
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <TextField
                fullWidth
                label="BÉNÉFICIAIRE"
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
              spacing={0}
              sx={{
                flexGrow: 1,
                pt: 0,
              }}
            >
              {beneficiaryList.map((beneficiary, index) => {
                console.log(beneficiary);

                return (
                  <Chip
                    key={index}
                    label={beneficiary}
                    onDelete={() => handleDeleteBeneficiary(index)}
                    variant="outlined"
                    sx={{
                      margin: 0.5,
                    }}
                  />
                );
              })}
            </Stack>

            <TextField
              fullWidth
              label="Montant global"
              name="amount"
              type="number"
              value={values.amount}
              onChange={handleChange}
            />
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
              variant="outlined"
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

ProjectEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  project: PropTypes.object,
};
