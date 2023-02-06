import React from 'react';
import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { SignupValidator } from './validate-signup';
import { SIGNUP_FIELDS } from './sign-up-fields';

/*
  Here we should check that all validations are good and not let the user progress
*/
export default function StepFour(props) {
  const { submitState, onInvalidState } = props;
  const [validationErrors, setValidationErrors] = useState(null);
  useEffect(() => {
    const allFields = Object.keys(SIGNUP_FIELDS)
    const errors = SignupValidator.validate(allFields, submitState);
    if (Object.keys(errors).length > 0) {
      onInvalidState(true);
      setValidationErrors(errors);
    }
  }, [])
  return (
    <Box mt={3}>
      <Box display="flex" flexDirection={"column"} justifyContent={"center"}>
        <Typography variant="h4" component="h2" align="center">
            Instant Bank Verification (IBV)
        </Typography>
        <Box>
          <p>Please click back and resolve these errors first before continuing.</p>
        </Box>
        <Typography  align="center">
          To complete your credit application, we need to perform a real-time verification of your primary bank account <br/> (active and where your paychecks are deposited)
        </Typography>
        <Typography  align="center">
          Click next to register your file with us and connect your financial details.
        </Typography>
      </Box>
    </Box>
  )
}
