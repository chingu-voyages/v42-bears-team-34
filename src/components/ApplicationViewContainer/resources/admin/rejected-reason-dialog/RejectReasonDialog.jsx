import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';
/**
 * Dialog that prompts the admin to enter a reason for the reject
 * Submit the command here
 * @param {{ onClose: () => void, open: boolean, onConfirmReject: (reason: string) => void }} props
 * @returns
 */
export function RejectReasonDialog(props) {
  const { onClose, open, onConfirmReject } = props;
  const [rejectReasonText, setRejectReasonText] = useState('');

  const handleClose = () => {
    onClose && onClose();
  };

  const handleConfirmReject = () => {
    onConfirmReject && onConfirmReject(rejectReasonText);
  };
  const handleChange = (e) => {
    setRejectReasonText(e.target.value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Respond to Application</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a some text to explain this action (optional)
        </DialogContentText>
        <Box component={'header'}>
          <TextField
            sx={{ width: 400 }}
            type="text"
            name={'reason'}
            label="Application Rejection Reason"
            margin="normal"
            variant="outlined"
            color="secondary"
            value={rejectReasonText}
            onChange={handleChange}
            InputProps={{ maxLength: 125 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disableElevation onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          disableElevation
          onClick={handleConfirmReject}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
