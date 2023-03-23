import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { PALLET } from '../../stylings/pallet';
import { StyledTextLink } from '../StyledTextLink';
import { StyledButton } from '../StyledButton';
import { ErrorComponent } from '../ErrorComponent';
import { StyledFormBox } from './StyledFormBox';
import { StyledTextFieldBox } from './StyledTextFieldBox';
const marginBottomSpacing = 1;

/**
 *
 * @param {{ isAdmin: boolean,
 * emailErrorText: string,
 * handleInputsChanged: () => void,
 * hasEmailError: boolean,
 * hasPasswordError: boolean,
 * navigate: any,
 * handleLoginSubmit: ()=> void,
 * submitDisabled: boolean,
 * hasLoginError: boolean,
 * loginErrorText: string
 * }} props
 * @returns
 */
export function LoginFormComponent(props) {
  const {
    title,
    isAdmin,
    emailErrorText,
    handleInputsChanged,
    hasEmailError,
    hasPasswordError,
    navigate,
    handleLoginSubmit,
    submitDisabled,
    hasLoginError,
    loginErrorText,
  } = props;

  return (
    <StyledFormBox component="form" autoComplete="on">
      <Box>
        <Box display={'flex'} justifyContent="center" mb={marginBottomSpacing}>
          <Box component={'div'}>
            {/* Holds the title */}
            <Typography variant="h2">{title || 'Login Portal'}</Typography>
            {isAdmin && (
              <Box>
                <Typography variant="h6" textAlign={'center'}>
                  Admin
                </Typography>
              </Box>
            )}
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
          <TextField
            sx={{ mb: marginBottomSpacing }}
            id="password"
            name="password"
            type={'password'}
            label="Password"
            autoComplete="password"
            error={hasPasswordError}
            required
            onChange={handleInputsChanged}
            fullWidth
          />
        </StyledTextFieldBox>
        {!isAdmin && (
          <Box display={'flex'} justifyContent={'center'}>
            <StyledTextLink
              text="Forgot my credentials"
              url="/password-reset/request"
              navigate={navigate}
              textProps={{ sx: { fontSize: '12px' } }}
            />
          </Box>
        )}
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledButton
            label="Login"
            onClick={handleLoginSubmit}
            disabled={submitDisabled}
            buttonColor={PALLET.mountainDewLime}
          />
        </Box>
      </Box>
      {hasLoginError && (
        <Box mt={2}>
          <ErrorComponent title={loginErrorText} />
        </Box>
      )}
    </StyledFormBox>
  );
}
