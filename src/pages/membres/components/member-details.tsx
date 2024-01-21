import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import type { SeverityPillColor } from 'src/components/severity-pill';
import { SeverityPill } from 'src/components/severity-pill';
import { Scrollbar } from 'src/components/scrollbar';
import type { Order, OrderStatus } from 'src/types/order';
import { Customer } from 'src/types/customer';

interface MemeberDetailsProps {
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  member: Customer;
}

export const MemeberDetails: FC<MemeberDetailsProps> = (props) => {
  const { onApprove, onEdit, onReject, member } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';
  //   const items = memeber.items || [];
  //   const createdAt = format(memeber.createdAt, 'dd/MM/yyyy HH:mm');
  //   const totalAmount = numeral(memeber.totalAmount).format(`${order.currency}0,0.00`);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">détails</Typography>
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            }
          >
            modifier
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID Membre"
            value={member.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Nom & prénom"
            value={member.name}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Registre de Commerce"
            value={member.updatedAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Moyen de paiement"
            value={member.city}
          ></PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Montant"
            value={'MAD ' + member.totalSpent}
          />
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            onClick={onApprove}
            size="small"
            variant="contained"
          >
            Approuver
          </Button>
          <Button
            color="error"
            onClick={onReject}
            size="small"
            variant="outlined"
          >
            Rejeter
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">Historique de paiements projets</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Billing Cycle</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

MemeberDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object,
};
