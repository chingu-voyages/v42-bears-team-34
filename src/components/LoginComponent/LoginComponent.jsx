import React, { useCallback, useRef, useState } from 'react';
import { STRING_HELPERS } from '../../utils/string-helpers';
import { AuthClient } from '../../services/api-clients/auth-client';
import { TokenManager } from '../../services/token-manager/token-manager';

import { useNavigate } from 'react-router-dom';
import { LoginFormComponent } from './LoginFormComponent';
import { PasswordResetRequestFormComponent } from './PasswordResetRequestFormComponent/PasswordResetRequestFormComponent';

/**
 * Sign in form to be used for user and admin login.
 * This can be nested in a modal or on a page itself,
 *
 */
function LoginComponent(props) {
  const { isAdmin, onLoginSuccess, passwordResetMode } = props;

  const formDataRef = useRef({}); // Keep track of textInput values
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [hasLoginError, setHasLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
          isAdmin: isAdmin,
        });
        // Save JW Token and call the success callback
        const { tok } = response;
        TokenManager.writeToken(tok);
        onLoginSuccess();
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

  /**
   *
   * @param {string[]} fields
   * @returns
   */
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
    if (!passwordResetMode) {
      if (!formDataRef.current) return false;
      if (!formDataRef.current['email']) return false;
      if (formDataRef.current['email'].trim() === '') return false;
      if (!formDataRef.current['password']) return false;
      if (formDataRef.current['password'].trim() === '') return false;
      return true;
    } else {
      if (!formDataRef.current['email']) return false;
      if (formDataRef.current['email'].trim() === '') return false;
      if (!STRING_HELPERS.isEmailValid(formDataRef.current['email']))
        return false;
      return true;
    }
  };

  const clearErrorState = () => {
    setEmailErrorText('');
    setHasEmailError(false);
    setHasPasswordError(false);
    setHasLoginError(false);
    setLoginErrorText('');
  };

  const handlePasswordResetRequest = useCallback(() => {
    // Validate any data?
    clearErrorState();
    setIsLoading(true);
    const sendPasswordRecoveryRequest = async () => {
      const authClient = new AuthClient();
      try {
        await authClient.sendPasswordRecoveryRequestAuthorization({
          email: formDataRef.current['email'],
        });
        setSubmitSuccessMessage(
          'The request has been submitted. If this is valid, you should shortly receive an e-mail with a recovery link.'
        );
        setSubmitDisabled(true);
        setIsLoading(false);
      } catch (err) {
        setSubmitDisabled(true);
        setIsLoading(false);
        console.log(err);
      }
    };
    sendPasswordRecoveryRequest();
  }, []);

  const getLoginInteraction = () => {
    if (!passwordResetMode) {
      return (
        <LoginFormComponent
          hasEmailError={hasEmailError}
          hasPasswordError={hasPasswordError}
          submitDisabled={submitDisabled}
          emailErrorText={emailErrorText}
          hasLoginError={hasLoginError}
          loginErrorText={loginErrorText}
          handleInputsChanged={handleInputsChanged}
          handleLoginSubmit={handleLoginSubmit}
          navigate={navigate}
        />
      );
    }
    return (
      <PasswordResetRequestFormComponent
        hasEmailError={hasEmailError}
        handleInputsChanged={handleInputsChanged}
        emailErrorText={emailErrorText}
        handleSubmitRequest={handlePasswordResetRequest}
        submitDisabled={submitDisabled}
        submitSuccessMessage={submitSuccessMessage}
        navigate={navigate}
        isLoading={isLoading}
      />
    );
  };
  return <>{getLoginInteraction()}</>;
}

export default LoginComponent;
