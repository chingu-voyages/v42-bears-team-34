import React, { useState, useEffect } from 'react';
import { STEP_STATE } from '../steps-state';
import { StandardTextField } from '../../../components/StandardTextField';
import { SIGNUP_FIELDS } from '../sign-up-fields';
import { SignupDataStore } from '../../../services/SignupDataStore/signup-data-store';
import { Box, Typography } from '@mui/material';
import { StyledButton } from '../../../components/StyledButton';
import { PALLET } from '../../../stylings/pallet';

/**
 *
 * @param {{ onStepDataChange: () => void, onResendCodeButtonClicked: ()=> void}} props
 * @returns {JSX.Element}
 */
export default function VerificationCodeStep(props) {
  const [inputs, setInputs] = useState(STEP_STATE[1].data);
  const [resendCodeDisabled, setResendCodeDisabled] = useState(false);
  const { onStepDataChange, onResendCodeButtonClicked, emailVerified } = props;

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    onStepDataChange && onStepDataChange(inputs);
  }, [inputs]);

  // When page renders, attempt to pre-populate data from sessionStorage
  useEffect(() => {
    setInputs(SignupDataStore.getData(Object.keys(inputs)));
  }, []);

  return (
    <Box>
      <Box>
        <Typography>Check your e-mail for your verification code</Typography>
      </Box>
      <Box>
        <StandardTextField
          fieldName={SIGNUP_FIELDS.verificationCode}
          fieldLabel={'Verification Code'}
          fieldValue={inputs[SIGNUP_FIELDS.verificationCode]}
          onFieldValueChanged={handleChange}
          required
          maxLength={6}
          errors={props.errors}
          disabled={emailVerified}
        />
      </Box>
      <Box display="flex" justifyContent={'center'}>
        <StyledButton
          label={'Resend Code'}
          onClick={() => {
            setResendCodeDisabled(true);
            onResendCodeButtonClicked && onResendCodeButtonClicked();
          }}
          buttonTextColor={PALLET.white}
          disabled={emailVerified || resendCodeDisabled}
        />
      </Box>
    </Box>
  );
}
