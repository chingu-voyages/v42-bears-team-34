import { useCallback } from 'react';
import { Box, FormGroup, FormControlLabel, Typography, Modal, Checkbox } from '@mui/material';
import StyledButton from '../StyledButton/StyledButton';
import { PALLET } from '../../stylings/pallet';

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

function SignupModal(props) {
  const handleConfirmModal = useCallback(() => {
    // User confirms our terms
    props.onConfirmModal && props.onConfirmModal()
  },[])

  const handleDeclineModal = useCallback(() => {
    // User declines our terms
    props.onClose && props.onClose();
  })
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Before we begin, please confirm:
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="You are a Canadian resident" />
            <FormControlLabel control={<Checkbox />} label="You are 18 years old or older" />
            <FormControlLabel control={<Checkbox />} label="You have a minimum income of 1000$ (per month)" />
            <FormControlLabel control={<Checkbox />} label="You are not in bankruptcy proceedings" />
          </FormGroup>
          <Box component={"div"} display="flex" justifyContent={"space-between"} mt={3} mb={3}>
            <StyledButton 
              onClick={handleConfirmModal} 
              label={"I agree"}
              buttonColor={PALLET.mountainDewLime}
              borderRadius="20px"
              style={{ fontWeight: "bold" }}
            />
            <StyledButton 
              label={"Cancel"} 
              borderRadius="20px"
              style={{ fontWeight: "bold" }}
              onClick={handleDeclineModal}
            />
          </Box>
          <Typography sx={{ marginTop: "10px", fontSize: "0.8rem" }}>
            Check if you are eligible or call us at 999-999-9999
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default SignupModal;
