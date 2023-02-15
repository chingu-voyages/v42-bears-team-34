import { useCallback } from "react";
import { Box, Modal, Typography, styled } from "@mui/material";
import StyledButton from "../StyledButton/StyledButton";
import ErrorIcon from '@mui/icons-material/ErrorOutlineSharp';
import { PALLET } from "../../stylings/pallet";
const StyledModalBox = styled(Box)((props) => ({
  backgroundColor: 'white',
  padding: "2rem",
  [props.theme.breakpoints.down("sm")]: {
    marginTop: "30vh"
  },
  [props.theme.breakpoints.up("sm")]: {
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "20vh"
  }
}))

/**
 * 
 * @param {{ open: boolean, title: string, bodyText: string, onDismiss: ()=> void, specialAction: ()=> void }} props 
 * @returns 
 */
function AlertModal (props) {
  const { open, title, bodyText, onDismiss } = props;
  const handleConfirmModal = useCallback(() => {
    onDismiss && onDismiss();
  })
  return (
    <Modal
      open={open}
      onClose={onDismiss}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <StyledModalBox>
        <Box component={"div"} display={"flex"}>
          <Box mt={5}>
            <ErrorIcon sx={{ color: PALLET.hemoglobinErrorRed, fontSize: 50 }} />
          </Box>
          <Box ml={5}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} component="h3">
              {bodyText}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent={"center"}>
          <StyledButton 
            onClick={handleConfirmModal} 
            label={"OK"}
            buttonColor={PALLET.mountainDewLime}
            borderRadius="20px"
            style={{ fontWeight: "bold" }}
          />
        </Box>
      </StyledModalBox>
    </Modal>
  )
}

export default AlertModal;
