import React from 'react';
import {
  Box,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import { UserDetailsUpdater } from './UserDetailsUpdater';
import { CreditApplicationUpdater } from './CreditApplicationUpdater';
import { PALLET } from '../../stylings/pallet';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getView = (view, userData, applicationData, handleClose) => {
  switch (view) {
    case 'update_personal':
      return (
        <Box
          pt={3}
          sx={{
            width: '100%',
            bgcolor: PALLET.applicationDetails.backgroundColor,
          }}
        >
          <Typography variant="h2" textAlign={'center'}>
            Personal Details
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <UserDetailsUpdater
              userData={userData}
              onUpdate={() => handleClose()}
            />
          </Box>
        </Box>
      );
    case 'update_credit':
      return (
        <Box
          pt={3}
          sx={{
            width: '100%',
            bgcolor: PALLET.applicationDetails.backgroundColor,
          }}
        >
          <Typography variant="h2" textAlign={'center'}>
            Credit Application Details
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <CreditApplicationUpdater
              applicationData={applicationData}
              userData={userData}
              onUpdate={() => handleClose()}
            />
          </Box>
        </Box>
      );
    default:
      return null;
  }
};
/**
 * This only appears in a portal session with authenticated user (non-admin)
 * Allow user to update application attributes
 * Allow to re-connect plaid
 * @param {{ open: boolean, applicationData: any, view: "update_personal" | "update_credit" | "update_plaid" }} props
 * @returns
 */
function PortalApplicationUpdaterContainer(props) {
  const { open, onClose, applicationData, userData, view } = props;

  const handleClose = () => {
    // Do something
    onClose && onClose();
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {getView(view, userData, applicationData, handleClose)}
    </Dialog>
  );
}

export default PortalApplicationUpdaterContainer;
