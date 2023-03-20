import { Box, Typography, TextField } from '@mui/material';
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StyledButton } from '../../StyledButton';
import { StyledFormBox } from '../StyledFormBox';
import { StyledTextFieldBox } from '../StyledTextFieldBox';
import { PALLET } from '../../../stylings/pallet';
import { TokenManager } from '../../../services/token-manager/token-manager';
import { ResponsiveParentContainer } from '../../ResponsiveParentContainer/ResponsiveParentContainer';
import dayjs from 'dayjs';
import { StyledTextLink } from '../../StyledTextLink';
import { SIGNUP_FIELDS } from '../../../pages/signup/sign-up-fields';
import { SignupValidator } from '../../../pages/signup/validate-signup';
import { AuthClient } from '../../../services/api-clients/auth-client';
import AppContext from '../../../context/AppContext';
import { getUserProfile } from '../../../services/get-user-profile/get-user-profile';
const marginBottomSpacing = 1;

/**
 * This is the form that allows user to reset password.
 * Need to ac
 * @param {*} props
 * @returns
 */
export function ChangePasswordForm(props) {
  const { submitDisabled } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hasTokenParseError, setHasTokenParseError] = useState(false);
  const token = searchParams.get('token');
  const [passwordErrorText, setPasswordErrorText] = useState({
    [SIGNUP_FIELDS.password1]: null,
    [SIGNUP_FIELDS.password2]: null,
  });
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const inputs = useRef({});
  const dispatch = useContext(AppContext);
  // When this page loads, we need to decode the
  useEffect(() => {
    if (token) {
      checkTokenIsValid();
    }
  }, [token]);

  const handleInputsChanged = (e) => {
    inputs.current = {
      ...inputs.current,
      [e.target.name]: e.target.value,
    };
  };

  const checkTokenIsValid = () => {
    try {
      const parsedToken = TokenManager.parseToken(token);
      console.log(parsedToken.email);
      console.log(parsedToken);
      // Extract the time stamp. If it's expired, throw an error
      const now = dayjs();
      const expires = dayjs(parsedToken.expires);

      if (now.isAfter(expires)) {
        // The request has expired
        console.log('Request has expired');
        setHasTokenParseError(true);
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
      setHasTokenParseError(true);
      return false;
    }
  };
  const handleSubmitRequest = async () => {
    resetPasswordErrors();
    // Validate
    const errors = SignupValidator.validate(
      [SIGNUP_FIELDS.password1, SIGNUP_FIELDS.password2],
      inputs.current
    );
    if (Object.keys(errors).length > 0) {
      setHasPasswordError(true);
      setPasswordErrorText({
        ...errors,
      });
      return;
    }

    // Check that the token hasn't expired before
    if (checkTokenIsValid()) {
      // Send the request - if it's successful, log the user in
      try {
        const authClient = new AuthClient();
        await authClient.submitPasswordRecoveryNewPassword({
          token: token,
          password: inputs.current[SIGNUP_FIELDS.password1],
        });
        const parsedToken = TokenManager.parseToken(token);
        const { email, isAdmin } = parsedToken;
        await authClient.login({
          email,
          password: inputs.current[SIGNUP_FIELDS.password1],
          isAdmin: isAdmin,
        });
        // If successful, redirect
        await getUserProfile(dispatch, navigate, false);
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const resetPasswordErrors = () => {
    setHasPasswordError(false);
    setPasswordErrorText({});
  };
  const renderForm = useCallback(() => {
    if (hasTokenParseError) {
      return (
        <Box mt={5} display="flex" justifyContent={'center'}>
          <Box>
            <Typography
              fontSize={'2rem'}
              sx={{ color: PALLET.hemoglobinErrorRed }}
            >
              This request is invalid or has expired
            </Typography>
            <StyledTextLink
              text="Return Home"
              url="/"
              navigate={navigate}
              textProps={{ textAlign: 'center', fontSize: '1rem' }}
            />
          </Box>
        </Box>
      );
    }

    return (
      <ResponsiveParentContainer>
        <StyledFormBox>
          <Box>
            <Box
              display={'flex'}
              justifyContent="center"
              mb={marginBottomSpacing}
            >
              <Box component={'div'}>
                {/* Holds the title */}
                <Typography variant="h2">Change your password</Typography>
              </Box>
            </Box>
          </Box>
          <StyledTextFieldBox>
            <TextField
              sx={{ mb: marginBottomSpacing }}
              id={SIGNUP_FIELDS.password1}
              name={SIGNUP_FIELDS.password1}
              type={'password'}
              label="Set a new password"
              autoComplete="password"
              onChange={handleInputsChanged}
              helperText={passwordErrorText[SIGNUP_FIELDS.password1]}
              required
              error={hasPasswordError}
              fullWidth
            />
          </StyledTextFieldBox>
          <StyledTextFieldBox>
            <TextField
              sx={{ mb: marginBottomSpacing }}
              id={SIGNUP_FIELDS.password2}
              name={SIGNUP_FIELDS.password2}
              type={'password'}
              label="Confirm new password"
              autoComplete="password"
              onChange={handleInputsChanged}
              helperText={passwordErrorText[SIGNUP_FIELDS.password2]}
              required
              error={hasPasswordError}
              fullWidth
            />
          </StyledTextFieldBox>
          <Box display="flex" justifyContent="center" mt={2}>
            <StyledButton
              label="Submit Request"
              onClick={handleSubmitRequest}
              disabled={submitDisabled}
              buttonColor={PALLET.mountainDewLime}
            />
          </Box>
        </StyledFormBox>
      </ResponsiveParentContainer>
    );
  });
  return renderForm();
}
