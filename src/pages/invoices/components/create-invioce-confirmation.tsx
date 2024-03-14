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
import CheckDone01 from 'src/icons/untitled-ui/duocolor/check-done-01';

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

interface CreateConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  id?: string;
}

const CreateConfirmationModal: FC<CreateConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
  id,
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
          backgroundColor: 'success.lightest',
          color: 'success.main',
        }}
      >
        <SvgIcon>
          <CheckDone01 />
        </SvgIcon>
      </Avatar>
      <div>
        <Typography variant="h5">Confirmation de creation</Typography>
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
        variant="text"
        sx={{
          color: 'error.main',
          '&:hover': {
            color: 'error.dark',
          },
          mr: 2,
        }}
        onClick={onCancel}
      >
        Annuler
      </Button>
      <Button
        sx={{
          backgroundColor: 'success.main',
          '&:hover': {
            backgroundColor: 'success.dark',
          },
        }}
        variant="contained"
        onClick={onConfirm}
      >
        Confirmer
      </Button>
    </Box>
  </Dialog>
);
export default CreateConfirmationModal;
