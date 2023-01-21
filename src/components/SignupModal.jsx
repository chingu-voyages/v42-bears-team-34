import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function SignupModal() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Start the processs
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Check if you are eligible or call us at 999-999-9999
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="I am a Canadian resident" />
            <FormControlLabel control={<Checkbox />} label="I am 18 years old or older" />
            <FormControlLabel control={<Checkbox />} label="I have a minimum income of 1000$ (per month)" />
            <FormControlLabel control={<Checkbox />} label="I am not in bankruptcy proceedings" />
          </FormGroup>
          <Button>Next</Button>
        </Box>
      </Modal>
    </div>
  );
}
