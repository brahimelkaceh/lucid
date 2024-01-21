import type { FC } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { Customer } from 'src/types/customer';
import { MemeberDetails } from './member-details';
import { MemberEdit } from './member-edit';

// import { OrderDetails } from './order-details';
// import { OrderEdit } from './order-edit';

interface OrderDrawerProps {
  container?: HTMLDivElement | null;
  open?: boolean;
  onClose?: () => void;
  member?: Customer;
}

export const OrderDrawer: FC<OrderDrawerProps> = (props) => {
  const { container, onClose, open, member } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  let content: JSX.Element | null = null;

  if (member) {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            {member.name}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {!isEditing ? (
            <MemeberDetails
              onApprove={onClose}
              onEdit={handleEditOpen}
              onReject={onClose}
              member={member}
            />
          ) : (
            <MemberEdit
              onCancel={handleEditCancel}
              onSave={handleEditCancel}
              member={member}
            />
          )}
        </Box>
      </div>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 500,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute',
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
          pointerEvents: 'auto',
          position: 'absolute',
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

OrderDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  order: PropTypes.object,
};
