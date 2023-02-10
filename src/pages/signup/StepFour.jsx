import React from 'react';
import { Typography, Box } from '@mui/material';
/*
  Here we should check that all validations are good and not let the user progress
  When the user clicks next from this page, we should do the sign-up process
*/
export default function StepFour() {
  return (
    <Box mt={3}>
      <Box display="flex" flexDirection={"column"} justifyContent={"center"}>
        <Typography variant="h4" component="h2" align="center">
            Instant Bank Verification (IBV)
        </Typography>
        <Typography  align="center">
          To complete your credit application, we need to perform a real-time verification of your primary bank account <br/> (active and where your paychecks are deposited)
        </Typography>
        <Typography  align="center">
          Click 'confirm' to register your file with us and connect your financial details.
        </Typography>
      </Box>
    </Box>
  )
}
