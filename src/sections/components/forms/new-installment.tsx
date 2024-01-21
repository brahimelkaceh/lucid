import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import { Autocomplete, Stack } from '@mui/material';
import { fileManagerApi } from 'src/api/file-manager';
import SvgIcon from '@mui/material/SvgIcon';
import { FileUploader } from 'src/sections/dashboard/file-manager/file-uploader';
import { useSettings } from 'src/hooks/use-settings';
import { useDialog } from 'src/hooks/use-dialog';
import { log } from 'console';
import { MobileDatePicker } from '@mui/x-date-pickers';

interface NewInstallmentProps {
  onSubmit: (formData: NewInstallmentData) => void;
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

type PaymentMethod = {
  text: string;
  value: number;
};

const methods: PaymentMethod[] = [
  {
    text: 'method 1',
    value: 1,
  },
  {
    text: 'method 2',
    value: 2,
  },
];

interface NewInstallmentData {
  paymentAmount: string;
  paymentMethod: PaymentMethod | null;
  selectedProject: Option | null;
}

const NewInstallment: FC<NewInstallmentProps> = ({ onSubmit }) => {
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Option | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const uploadDialog = useDialog();

  const handlepaymentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(event.target.value);
  };

  const handlepaymentMethodChange = (event: React.ChangeEvent<{}>, value: PaymentMethod | null) => {
    setPaymentMethod(value);
  };

  const handleProjectChange = (event: React.ChangeEvent<{}>, value: Option | null) => {
    setSelectedProject(value);
  };

  const handleFileUpload = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a FormData object
    const completeFormData = new FormData();
    completeFormData.append('paymentAmount', paymentAmount);
    completeFormData.append('paymentMethod', paymentMethod?.value.toString() || '');
    completeFormData.append('selectedProject', selectedProject?.value.toString() || '');

    // Append files to the FormData object
    selectedFiles.forEach((file, index) => {
      completeFormData.append(`file${index + 1}`, file);
    });

    try {
      // Send FormData to the server for processing (adjust the endpoint accordingly)
      // const response = await fileManagerApi.uploadFiles(completeFormData);

      // Handle the server response as needed
      // console.log('Server response:', response);

      // Continue with form submission if needed
      const formData: NewInstallmentData = {
        paymentAmount,
        paymentMethod,
        selectedProject,
      };

      console.log(formData);

      onSubmit(formData);
    } catch (error) {
      console.error('Upload failed:', error);
    }
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
            <Autocomplete
              getOptionLabel={(option: Option) => option.text}
              options={projects}
              onChange={handleProjectChange}
              value={selectedProject}
              renderInput={(params): JSX.Element => (
                <TextField
                  {...params}
                  fullWidth
                  label="ID PROJET"
                  name="projectId"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <TextField
              fullWidth
              label="Mont. Versement"
              name="paymentAmount"
              required
              size="small"
              value={paymentAmount}
              onChange={handlepaymentAmountChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <MobileDatePicker
              label="Reçu le"
              onChange={(newDate) => setStartDate(newDate)}
              value={startDate}
            />
          </Grid>
          {/* <Grid
            item
            xs={12}
            md={12}
          >
            <Autocomplete
              getOptionLabel={(option: PaymentMethod) => option.text}
              options={methods}
              onChange={handlepaymentMethodChange}
              value={paymentMethod}
              renderInput={(params): JSX.Element => (
                <TextField
                  {...params}
                  fullWidth
                  label="Payment Method"
                  name="paymentMethod"
                />
              )}
            />
          </Grid> */}
          {/* <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Button
                onClick={uploadDialog.handleOpen}
                startIcon={
                  <SvgIcon>
                    <Upload01Icon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Upload
              </Button>
            </Stack>
          </Grid> */}
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
          >
            Créer une tranche
          </Button>
        </Box>
      </form>
      <FileUploader
        onClose={uploadDialog.handleClose}
        onUpload={handleFileUpload}
        open={uploadDialog.open}
      />
    </Box>
  );
};

export default NewInstallment;
