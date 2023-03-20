import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { StyledFormBox } from '../StyledFormBox';
import { StyledTextFieldBox } from '../StyledTextFieldBox';
import { StyledButton } from '../../StyledButton';
import { PALLET } from '../../../stylings/pallet';
import { StyledTextLink } from '../../StyledTextLink';
import { Spinner } from '../../Spinner';

const marginBottomSpacing = 1;

/**
 *
 */
export function PasswordResetRequestFormComponent(props) {
  const {
    handleInputsChanged,
    emailErrorText,
    hasEmailError,
    handleSubmitRequest,
    submitDisabled,
    submitSuccessMessage,
    navigate,
    isLoading,
  } = props;
  return (
    <StyledFormBox component="form" autoComplete="on">
      {isLoading && <Spinner />}
      <Box>
        <Box display={'flex'} justifyContent="center" mb={marginBottomSpacing}>
          <Box component={'div'}>
            {/* Holds the title */}
            <Typography variant="h2">Password Reset Request</Typography>
          </Box>
        </Box>
        <StyledTextFieldBox>
          <TextField
            sx={{ mb: marginBottomSpacing }}
            id="email"
            name="email"
            type={'email'}
            label="E-mail Address"
            placeholder="example@example.com"
            autoComplete="email"
            onChange={handleInputsChanged}
            helperText={emailErrorText}
            required
            error={hasEmailError}
            fullWidth
          />
        </StyledTextFieldBox>
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledButton
            label="Submit Request"
            onClick={handleSubmitRequest}
            disabled={isLoading || submitDisabled}
            buttonColor={PALLET.mountainDewLime}
          />
        </Box>
        {submitSuccessMessage && (
          <Box mt={3}>
            <Typography>{submitSuccessMessage}</Typography>
            {/* Include some link to headback to home here */}
            <StyledTextLink text={'Home'} url={'/'} navigate={navigate} />
          </Box>
        )}
      </Box>
    </StyledFormBox>
  );
}
