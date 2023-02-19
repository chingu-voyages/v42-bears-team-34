import React, { useCallback, useContext } from 'react';
import { Button, styled } from '@mui/material';
import { usePlaidLink } from 'react-plaid-link';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { PlaidClient } from '../../services/api-clients/plaid-client';
import { TokenManager } from '../../services/token-manager/token-manager';
import AppContext from '../../context/AppContext';
import { APP_ACTIONS } from '../../context/app.actions';
const StyledCustomPlaidButton = styled(Button)((props) => ({
  '&.MuiButtonBase-root': {
    'border-radius': props.borderRadius || '30px',
  },
}));

const clearLinkTokenError = () => {
  return {
    error_type: '',
    error_code: '',
    error_message: '',
  };
};
/**
 * This component only handles getting the plaid widget to work and to exchange tokens.
 * It won't trigger the fetching of financial data. Do that outside of this component.
 * The button should be enabled (available) if authentication and linkToken work.
 * Props should contain link token
 * @param {{ linkToken: string, onLinkButtonClicked: () => void, onPlaidSuccessComplete: () => void, onAbort: () => void }} props
 */
function PlaidLinkWidget(props) {
  const { dispatch } = useContext(AppContext);

  // This is called when the plaid token exchange is complete to signal to parent component.
  const handlePlaidSuccessComplete = () => {
    props.onPlaidSuccessComplete && props.onPlaidSuccessComplete();
  };

  const onSuccess = useCallback((public_token) => {
    const exchangePublicTokenForAccessToken = async () => {
      // Get token from sessionStorage
      const jwtToken = TokenManager.getToken();
      const plaidClient = new PlaidClient({ authToken: jwtToken });

      // Send the request to exchange the public token for a link token
      await plaidClient.postSetPublicToken(public_token);

      dispatch({
        type: APP_ACTIONS.SET_STATE,
        state: {
          linkSuccess: true,
          hasLinkTokenError: false,
          linkTokenError: clearLinkTokenError(),
        },
      });
      handlePlaidSuccessComplete();
    };
    exchangePublicTokenForAccessToken();
  }, []);

  // Error handling if user exits Link without connecting or otherwise some other error
  const onExit = useCallback((err) => {
    // Dispatch error state
    const { error_type, error_code, error_message } = err;
    dispatch({
      type: APP_ACTIONS.SET_STATE,
      state: {
        linkSuccess: false,
        hasLinkTokenError: true,
        linkTokenError: {
          error_type,
          error_code,
          error_message,
        },
      },
    });
    if (exit) exit({ force: true });
    // Do something
    props.onAbort && props.onAbort();
  }, []);

  const onEvent = useCallback(() => {
    // Log something
  });
  const handleLinkButtonClicked = useCallback((open) => {
    props.onLinkButtonClicked && props.onLinkButtonClicked();
    if (open) open();
  }, []);

  let isOauth = false;
  const plaidConfig = {
    token: props.linkToken,
    receivedRedirectUri: null,
    onSuccess,
    onExit,
    onEvent,
  };

  if (window.location.href.includes('?oauth_state_id=')) {
    plaidConfig.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, exit, ready } = usePlaidLink(plaidConfig);
  return (
    // Plaid button
    <StyledCustomPlaidButton
      type="button"
      onClick={() => handleLinkButtonClicked(open)}
      disabled={!ready}
      variant="contained"
      startIcon={<AccountBalanceIcon />}
      {...props}
    >
      Connect your financial data
    </StyledCustomPlaidButton>
  );
}

export default PlaidLinkWidget;
