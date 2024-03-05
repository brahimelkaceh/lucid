import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { IconButton, SvgIcon } from '@mui/material';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack } from '@mui/system';

interface PaymentHistory {
  date: string;
  amount: string;
  id: number;
}

interface ExpenseHistoryTableRowProps extends PaymentHistory {
  onDelete: (id: number) => void;
}

const ExpenseHistoryTableRow: React.FC<ExpenseHistoryTableRowProps> = ({
  id,
  date,
  amount,
  onDelete,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  const [editedAmount, setEditedAmount] = useState(amount);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Handle saving the edited values (e.g., make an API call, update state, etc.)
    setEditMode(false);
  };

  const handleCancelClick = () => {
    // Handle canceling the edit mode
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    // Handle deleting the record
    onDelete(id);
  };

  return (
    <TableRow>
      {editMode ? (
        <>
          <TableCell>
            <TextField
              size="small"
              type="text"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              variant="standard"
            />
          </TableCell>
          <TableCell>
            <TextField
              size="small"
              type="text"
              variant="standard"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
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
          <TableCell>{amount}</TableCell>
          <TableCell align="right">
            <Stack
              direction="row"
              justifyContent="end"
              spacing={1}
            >
              <IconButton
                color="warning"
                onClick={handleEditClick}
              >
                <SvgIcon>
                  <Edit02Icon />
                </SvgIcon>
              </IconButton>
              <IconButton
                color="error"
                onClick={handleDeleteClick}
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

export default ExpenseHistoryTableRow;
