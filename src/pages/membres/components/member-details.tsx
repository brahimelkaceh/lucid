import type { FC } from 'react';
import PropTypes from 'prop-types';
import { format, fromUnixTime } from 'date-fns';
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
import { Member, methods } from 'src/types/members';
import { date } from 'yup';

interface MemeberDetailsProps {
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  member: Member;
}
const getPaymentMethodText = (value: number | null | undefined): string => {
  const method = methods.find((m) => m.value == value);
  return method ? method.text : '--';
};
export const MemeberDetails: FC<MemeberDetailsProps> = (props) => {
  const { onApprove, onEdit, onReject, member } = props;
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';

  const date = member.payment_date && format(member.payment_date?.toDate(), 'dd/MM/yyyy');

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">Détails du membre</Typography>
          <Button
            color="warning"
            variant="outlined"
            onClick={onEdit}
            size="small"
            startIcon={
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            }
          >
            Modifier
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Nom/Raison Sociale"
            value={member.full_name}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Email"
            value={member.email}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Registre de Commerce"
            value={member.rc_cin}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Moyen de paiement"
            value={getPaymentMethodText(member.payment_method)}
          ></PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Montant"
            value={'MAD ' + member.amount}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Reçu le"
            value={member.status == 'paid' ? date ?? '' : '--'}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Statut"
          >
            <SeverityPill color={member.status == 'paid' ? 'success' : 'error'}>
              {member.status == 'paid' ? 'Payée' : 'Impayée'}
            </SeverityPill>
          </PropertyListItem>
        </PropertyList>
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
