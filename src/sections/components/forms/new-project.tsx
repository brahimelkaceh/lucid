import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Chip from '@mui/material/Chip';
import { Grid, Stack, Typography } from '@mui/material';

interface NewProjectProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  projectId: string;
  financialBackers: string[];
  beneficiaries: string[];
  total: number | '';
}

const NewProject: FC<NewProjectProps> = ({ onSubmit }) => {
  const [projectId, setProjectId] = useState<string>('');
  const [financialBackersInput, setFinancialBackersInput] = useState<string>('');
  const [financialBackersList, setFinancialBackersList] = useState<string[]>([]);
  const [beneficiaryInput, setBeneficiaryInput] = useState<string>('');
  const [beneficiaryList, setBeneficiaryList] = useState<string[]>([]);
  const [total, setTotal] = useState<number | ''>(''); // Type number or empty string

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

  const handleTotalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Convert the input value to a number or set to an empty string if not a valid number
    const newValue: number | '' = /^\d+$/.test(inputValue) ? Number(inputValue) : '';

    setTotal(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create an object with the form data
    const formData: FormData = {
      projectId,
      financialBackers: financialBackersList,
      beneficiaries: beneficiaryList,
      total,
    };
    // Log the form data to the console
    console.log(formData);
    // Call the onSubmit callback with the form data
    onSubmit(formData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="ID PROJET"
              name="projectId"
              required
              size="small"
              value={projectId}
              onChange={(event) => setProjectId(event.target.value)}
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
              label="MONTANT GLOBAL"
              name="total"
              type="number"
              size="small"
              value={total}
              onChange={handleTotalChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
          >
            Créer un projet
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewProject;
