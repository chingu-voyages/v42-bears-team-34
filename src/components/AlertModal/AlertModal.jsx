import { Box, Modal } from "@mui/material";

/**
 * 
 * @param {{ open: boolean, title: string, bodyText: string }} props 
 * @returns 
 */
function AlertModal (props) {
  const { open, title, bodyText } = props;
  
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {bodyText}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default AlertModal;
