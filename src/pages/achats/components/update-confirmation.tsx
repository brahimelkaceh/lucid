import React, { FC, forwardRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Check from '@mui/icons-material/Check';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

interface UpdateConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const UpdateConfirmation: FC<UpdateConfirmationProps> = ({ isOpen, onConfirm, onCancel }) => (
  <Dialog
    open={isOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={onCancel}
    aria-describedby="alert-dialog-slide-description"
  >
    <Stack
      direction="row"
      spacing={2}
      sx={{ p: 3 }}
    >
      <Avatar sx={{ backgroundColor: 'primary.lightest', color: 'primary.main' }}>
        <Check />
      </Avatar>
      <div>
        <Typography variant="h5">Confirmation de Mise à Jour</Typography>
        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
          variant="body2"
        >
          Êtes-vous sûr(e) de vouloir mettre à jour ce Prestataires ? Les modifications seront
          enregistrées.{' '}
        </Typography>
      </div>
    </Stack>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 3, px: 3 }}>
      <Button
        color="error"
        sx={{ mr: 2 }}
        onClick={onCancel}
      >
        Annuler
      </Button>
      <Button
        sx={{
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          color: 'white',
        }}
        variant="contained"
        onClick={onConfirm}
      >
        confirmer{' '}
      </Button>
    </Box>
  </Dialog>
);
export default UpdateConfirmation;
