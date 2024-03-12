import React, { FC, forwardRef } from 'react';
import AlertTriangleIcon from '@untitled-ui/icons-react/build/esm/AlertTriangle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

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

interface DeleteSliceModalProps {
  isOpen: boolean;
  onConfirm: (id: string) => void;
  onCancel: () => void;
  message: string;
  id: string;
  projectId: string;
}

const DeleteSliceModal: FC<DeleteSliceModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  id,
  projectId,
}) => (
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
      sx={{
        display: 'flex',
        p: 3,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: 'error.lightest',
          color: 'error.main',
        }}
      >
        <SvgIcon>
          <AlertTriangleIcon />
        </SvgIcon>
      </Avatar>
      <div>
        <Typography variant="h5">Confirmation de suppression</Typography>
        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
          variant="body2"
        >
          {message}
        </Typography>
      </div>
    </Stack>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        pb: 3,
        px: 3,
      }}
    >
      <Button
        color="inherit"
        sx={{ mr: 2 }}
        onClick={onCancel}
      >
        Annuler
      </Button>
      <Button
        sx={{
          backgroundColor: 'error.main',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
        }}
        variant="contained"
        onClick={() => onConfirm(id)}
      >
        Supprimer
      </Button>
    </Box>
  </Dialog>
);
export default DeleteSliceModal;
