import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { IconButton, SvgIcon } from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack } from '@mui/system';
import { format } from 'date-fns';
import FirebaseProjects from 'src/firebaseServices/projets';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { Slice } from '@reduxjs/toolkit';
import { slice } from 'src/types/slice';

interface PaymentHistory {
  received_date: Date;
  amount: number;
  id: string;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
  projectId: string | undefined;
}

interface PaymentHistoryTableRowProps extends PaymentHistory {
  onDelete: () => void;
  onUpdate: () => void;
  projectId: string | undefined;
  amount: number;
  received_date: Date;
  created_at?: Date | null | undefined;
  updated_at?: Date | null | undefined;
  id: string;
}
const validationSchema = yup.object({
  amount: yup.number().min(0, 'Montant est requis'),
  received_date: yup.date().required('date reçu est requis'),
});
const PaymentHistoryTableRow: React.FC<PaymentHistoryTableRowProps> = ({
  id,
  received_date,
  amount,
  onDelete = () => {},
  onUpdate = () => {},
  projectId,
}) => {
  const firebaseSlice = new FirebaseProjects();

  const [editMode, setEditMode] = useState(false);
  const date = received_date && format(received_date?.toDate(), 'dd/MM/yyyy');
  const formik = useFormik({
    initialValues: {
      id: '',
      amount: 0,
      received_date: '',
      updated_at: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { id, ...sliceData } = values;

      try {
        // Handle form submission
        if (projectId) {
          await firebaseSlice.updateSlice(projectId, id, sliceData as unknown as slice, onUpdate);
        }
        toast.success('Slice modfiée avec succès !');
        setEditMode(false);
      } catch (error) {
        toast.error('Erreur lors de la création du membre!');
        console.error('Erreur lors de la création du membre!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
  };
  const handleCancelClick = () => {
    setEditMode(false);
  };
  useEffect(() => {
    formik.setFieldValue('id', id);

    formik.setFieldValue('amount', amount);
    formik.setFieldValue('received_date', received_date.toDate());
  }, [id]);
  const handleDelete = async (ProjectId: string, SliceId: string) => {
    console.log('project id ', ProjectId, 'slice id ', SliceId);

    try {
      await firebaseSlice.deleteSlice(ProjectId, SliceId, onDelete);
      toast.success('La tranche a été supprimé avec succès!');
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Échec de la suppression du tranche. Veuillez réessayer.');
    }
  };

  return (
    <TableRow>
      {editMode ? (
        <>
          <TableCell>
            <DatePicker
              onChange={(newDate) => formik.setFieldValue('received_date', newDate)}
              value={formik.values.received_date}
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              type="text"
              variant="standard"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </TableCell>
          <TableCell>
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <IconButton
                color="success"
                onClick={handleSaveClick}
              >
                <SvgIcon>
                  <SaveIcon />
                </SvgIcon>
              </IconButton>
              <IconButton
                color="error"
                onClick={handleCancelClick}
              >
                <SvgIcon>
                  <CloseIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{date}</TableCell>
          <TableCell>{'MAD ' + amount + '.00'}</TableCell>
          <TableCell align="right">
            <Stack
              direction="row"
              justifyContent="end"
              spacing={1}
            >
              <IconButton
                color="warning"
                onClick={() => handleEdit()}
              >
                <SvgIcon>
                  <Edit02Icon />
                </SvgIcon>
              </IconButton>
              <IconButton
                color="error"
                onClick={() => projectId && handleDelete(projectId, id)}
              >
                <SvgIcon>
                  <DeleteOutlineIcon />
                </SvgIcon>
              </IconButton>
            </Stack>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default PaymentHistoryTableRow;
