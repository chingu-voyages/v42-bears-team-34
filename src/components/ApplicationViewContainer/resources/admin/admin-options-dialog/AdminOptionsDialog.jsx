import { 
  Dialog,
  DialogContent,
  DialogTitle, 
  TextField,
  Button, 
  Box, 
  DialogActions,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  DialogContentText,
  styled
} from "@mui/material"
import { useState } from "react";
import { PALLET } from "../../../../../stylings/pallet";


const StyledDialog = styled(Dialog)((props) => ({
  "& .MuiPaper-root": {
    width: "100vw"
  },
}))
/**
 * 
 * @param {{ onClose: () => void, open: boolean, onSubmit: ({ action: "mark_incomplete" | "mark_more_info_required" | "update_reject_reason", message?: string }) =>void}} props 
 * @returns 
 */
export function AdminOptionsDialog (props) {
  const { onClose, open, onSubmit } = props;
  const [messageText, setMessageText] = useState("");
  const [applicationStatusValue, setApplicationStatusValue] = useState(null);
  const handleClose = () => {
    setApplicationStatusValue(null)
    onClose && onClose();
  }

  const handleSubmit = () => {
    onSubmit && onSubmit({ action: applicationStatusValue, message: messageText });
  }

  const handleAdminActionSelectChange = (e) => {
    setApplicationStatusValue(e.target.value)
  }
  return (
    <StyledDialog onClose={handleClose} open={open}>
      <DialogTitle>Admin Options</DialogTitle>
      <DialogContent>
        <Box component="form">
          <DialogContentText mb={3}>Select an action to be taken on this application</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="admin-action-label">Action</InputLabel>
            <Select
              labelId="admin-action-label"
              id="admin-action-select"
              value={applicationStatusValue}
              label="Action"
              onChange={handleAdminActionSelectChange}
            >
              <MenuItem value={null}></MenuItem>
              <MenuItem value={"mark_incomplete"}>Mark as Incomplete</MenuItem>
              <MenuItem value={"mark_more_info_required"}>More Info Required</MenuItem>
              <MenuItem value={"update_reject_reason"}>Update Reject Reason</MenuItem>
            </Select>
          </FormControl>
          { applicationStatusValue && (
            <FormControl fullWidth>
               <TextField
                sx={{width: "100%"}}
                type="text" 
                name={"status-message-text"}
                label="More information (optional)" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                value={messageText} 
                onChange={(e) => setMessageText(e.target.value)} 
                InputProps={{ maxLength: 125 }}
              />
            </FormControl>
          )}

        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color={"error"} disableElevation onClick={handleClose}>Cancel</Button>
        <Button variant="contained" sx={{ backgroundColor: PALLET.pineGreen }} disableElevation onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </StyledDialog>
  )
}
