import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
import Edit from '@mui/icons-material/Edit';
import { IconButton, Input, SvgIcon, TableCell, TableRow, TextField } from '@mui/material';
import Trash02 from '@untitled-ui/icons-react/build/esm/Trash02';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import FirebaseSlices from 'src/firebaseServices/tranches';
import { paths } from 'src/paths';
import { DeleteSliceModal } from './delete-slice-modal';
import * as yup from 'yup';
import { slice } from 'src/types/slice';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

interface SliceRowProps {
  slice: slice;
  projectId: string;
  onRefresh: () => void;
  onUpdate: () => void;
}
const validationSchema = yup.object({
  amount: yup.number().min(0, 'Montant est requis'),
  received_date: yup.date().required('date reçu est requis'),
});
const SliceRow: FC<SliceRowProps> = ({ slice, projectId, onRefresh, onUpdate }) => {
  const issueDate = slice.received_date ? format(slice.received_date.toDate(), 'MM/dd/yyyy') : '';

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [sliceId, setSliceId] = useState<string | null>(null);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const firebaseSlice = new FirebaseSlices();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      id: '',
      amount: 0,
      received_date: '',
      updated_at: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      values.amount = values.amount * 1;

      const { id, ...sliceData } = values;

      try {
        // Handle form submission
        if (projectId) {
          await firebaseSlice.updateSlice(projectId, id, sliceData as unknown as slice, onUpdate);
        }
        toast.success('Slice modfiée avec succès !');
        handleCancelEdit();
      } catch (error) {
        toast.error('Erreur lors de la création du membre!');
        console.error('Erreur lors de la création du membre!: ', error);
      } finally {
        // Set isSubmitting back to false after the submission is complete
        setSubmitting(false);
      }
    },
  });

  const handleEditClick = (sliceId: string) => {
    setEditRowId(sliceId);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
  };

  const handleSaveEdit = (sliceId: string) => {
    // Add logic to save the edited data
    formik.handleSubmit();
    setEditRowId(null);
  };
  useEffect(() => {
    formik.setFieldValue('id', slice.id);

    formik.setFieldValue('amount', slice.amount);
    formik.setFieldValue('received_date', slice.received_date.toDate());
  }, [slice.id]);
  const handleDeleteClick = (id: string) => {
    setSliceId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async (sliceId: string) => {
    try {
      await firebaseSlice.deleteSlice(projectId, sliceId, onRefresh);
      toast.success('La tranche a été supprimé avec succès!');
      router.replace(paths.dashboard.projets.details.replace(':projetId', projectId));
    } catch (error) {
      console.error('Error deleting member: ', error);
      toast.error('Échec de la suppression du tranche. Veuillez réessayer.');
    }
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setSliceId(null);
    setDeleteModalOpen(false);
  };
  return (
    <TableRow>
      <TableCell>
        {editRowId === slice.id ? (
          <DatePicker
            label="Reçu le"
            onChange={(newDate) => formik.setFieldValue('received_date', newDate)}
            value={formik.values.received_date}
          />
        ) : (
          issueDate
        )}
      </TableCell>
      <TableCell>
        {editRowId === slice.id ? (
          <TextField
            size="small"
            type="number"
            variant="filled"
            label="Montant"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
        ) : (
          `MAD ${slice.amount}`
        )}
      </TableCell>

      <TableCell align="right">
        {editRowId === slice.id ? (
          <>
            <IconButton
              color="success"
              onClick={() => handleSaveEdit(slice.id)}
            >
              <SvgIcon>
                <Check />
              </SvgIcon>
            </IconButton>
            <IconButton
              color="error"
              onClick={handleCancelEdit}
            >
              <SvgIcon>
                <Clear />
              </SvgIcon>
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              color="warning"
              onClick={() => handleEditClick(slice.id)}
            >
              <SvgIcon>
                <Edit />
              </SvgIcon>
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteClick(slice.id)}
            >
              <SvgIcon>
                <Trash02 />
              </SvgIcon>
            </IconButton>
            <DeleteSliceModal
              isOpen={isDeleteModalOpen}
              onConfirm={handleDeleteConfirmation}
              onCancel={handleDeleteCancel}
              message="Êtes vous sûr de vouloir supprimer cette tranche? Cette action sera irréversible."
              id={sliceId || ''}
              projectId={projectId}
            />
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default SliceRow;
