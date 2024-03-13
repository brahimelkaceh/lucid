import { useState, type ChangeEvent, type FC, type MouseEvent } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { SeverityPill, type SeverityPillColor } from 'src/components/severity-pill';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';

import { IconButton, SvgIcon, TableHead } from '@mui/material';

import { Member, methods } from 'src/types/members';
import toast from 'react-hot-toast';
import FirebaseMembers from 'src/firebaseServices/membres';
import DeleteConfirmationModal from './delete-confirmation';

interface MemberListTableProps {
  count?: number;
  members?: Member[];
  onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (orderId: string) => void;
  onDelete?: (memberId: string) => void;
  page?: number;
  rowsPerPage?: number;
  onDeleteMember?: () => void;
}

const MemberListTable: FC<MemberListTableProps> = (props) => {
  const {
    count = 0,
    members = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    onDelete,
    page = 0,
    rowsPerPage = 0,
    onDeleteMember = () => {},
  } = props;

  // Function to get payment method text based on value
  const getPaymentMethodText = (value: number | null): string => {
    const method = methods.find((m) => m.value == value);
    return method ? method.text : '--';
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom/Raison Sociale</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>registre de commerce</TableCell>
            <TableCell>Moyen de paiement</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Détails</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member, i) => {
            return (
              <TableRow
                hover
                key={i}
              >
                <TableCell>
                  <Typography variant="subtitle2">{member.full_name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{member.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{member.rc_cin}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {getPaymentMethodText(member.payment_method ?? null)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <SeverityPill color={member?.status == 'paid' ? 'success' : 'error'}>
                    {member?.status == 'paid' ? 'payée' : 'impayée'}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  {/* <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteModalOpen(true);
                      // handleDelete(member.id);
                    }}
                  >
                    <SvgIcon>
                      <DeleteOutlineIcon />
                    </SvgIcon>
                  </IconButton> */}
                  <IconButton
                    color="info"
                    onClick={() => onSelect?.(member.id)}
                  >
                    <SvgIcon>
                      <ArrowRightIcon />
                    </SvgIcon>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Lignes par page"
      />
    </div>
  );
};
export default MemberListTable;
MemberListTable.propTypes = {
  count: PropTypes.number,
  members: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onDeleteMember: PropTypes.func,
};
