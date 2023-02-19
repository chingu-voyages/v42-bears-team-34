import React, { useCallback, useRef, useState } from 'react';
import { Box, TextField, styled, Typography } from '@mui/material';
import { PALLET } from '../../stylings/pallet';
import { StyledButton } from '../StyledButton';
import { STRING_HELPERS } from '../../utils/string-helpers';
import { AuthClient } from '../../services/api-clients/auth-client';
import { TokenManager } from '../../services/token-manager/token-manager';
import { ErrorComponent } from '../ErrorComponent';
const StyledFormBox = styled(Box)((props) => ({
  [props.theme.breakpoints.up('md')]: {
    borderColor: PALLET.charcoal,
    borderWidth: '1px',
    borderStyle: 'solid',
    boxShadow: '7px 6px 15px -3px',
    padding: '50px',
    backgroundColor: PALLET.white,
  },
}));

const StyledTextFieldBox = styled(Box)((props) => ({
  [props.theme.breakpoints.down('md')]: {
    input: {
      backgroundColor: PALLET.white,
    },
  },
  [props.theme.breakpoints.up('md')]: {
    marginTop: '60px',
  },
}));

const marginBottomSpacing = 1;
/**
 * Sign in form to be used for user and admin login.
 * This can be nested in a modal or on a page itself,
 *
 */
function LoginComponent(props) {
  const formDataRef = useRef({}); // Keep track of textInput values
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [hasLoginError, setHasLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const handleLoginSubmit = useCallback(() => {
    clearErrorState();
    if (!validateInputs()) return;
    // setSubmitDisabled(true)

    const loginUser = async () => {
      /* Login the user
        If login is successful, call the onLoginSuccess callback.
        The parent component can handle navigation and setting any global state
      */
      const { email, password } = formDataRef.current;
      try {
        const authClient = new AuthClient();
        const response = await authClient.login({
          email,
          password,
          isAdmin: props.isAdmin,
        });
        // Save JW Token and call the success callback
        const { tok } = response;
        TokenManager.writeToken(tok);
        props.onLoginSuccess();
      } catch (exception) {
        setHasLoginError(true);
        setLoginErrorText(exception.response?.data?.err);
      } finally {
        setSubmitDisabled(false);
      }
    };
    loginUser();
  }, []);

  const handleInputsChanged = useCallback((event) => {
    formDataRef.current = {
      ...formDataRef.current,
      [event.target.name]: event.target.value,
    };
    setSubmitDisabled(!checkHasInput());
  });

  const validateInputs = () => {
    if (formDataRef.current['email'] === '') {
      setHasEmailError(true);
      return false;
    }
    if (!STRING_HELPERS.isEmailValid(formDataRef.current['email'])) {
      setHasEmailError(true);
      setEmailErrorText('Enter a valid e-mail address');
      return false;
    }
    if (formDataRef.current['password'] === '') {
      setHasPasswordError(true);
      return false;
    }
    return true;
  };

  const checkHasInput = () => {
    if (!formDataRef.current) return false;
    if (!formDataRef.current['email']) return false;
    if (formDataRef.current['email'].trim() === '') return false;
    if (!formDataRef.current['password']) return false;
    if (formDataRef.current['password'].trim() === '') return false;
    return true;
  };
  const clearErrorState = () => {
    setEmailErrorText('');
    setHasEmailError(false);
    setHasPasswordError(false);
    setHasLoginError(false);
    setLoginErrorText('');
  };
  return (
    <StyledFormBox component="form" autoComplete="on">
      <Box>
        <Box display={'flex'} justifyContent="center" mb={marginBottomSpacing}>
          <Box component={'div'}>
            {/* Holds the title */}
            <Typography variant="h2">
              {props.title || 'Login Portal'}
            </Typography>
            {props.isAdmin && (
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
            autoComplete="current-password"
            error={hasPasswordError}
            required
            onChange={handleInputsChanged}
            fullWidth
          />
        </StyledTextFieldBox>
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

export default LoginComponent;
