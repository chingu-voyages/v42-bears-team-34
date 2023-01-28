
import { Button, styled } from "@mui/material";
import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { PlaidClient } from "../../services/api-clients/plaid-client";
import { TokenManager } from "../../services/token-manager/token-manager";

const StyledCustomPlaidButton = styled(Button)((props) => ({
  "&.MuiButtonBase-root": {
    "border-radius": props.borderRadius || "30px"
  }
}))

/**
 * The button should be available if authentication and linkToken work
 * props should contain link token
 * @param {{ linkToken: string, onLinkButtonClicked: () => void }} props
 * @returns 
 */
function PlaidLinkWidget (props) {

  const onSuccess = useCallback((public_token, metaData) => {
    const exchangePublicTokenForAccessToken =  async() => {
      // Send the public token to the server.

      // Get token from sessionStorage
      const jwtToken = TokenManager.getToken();
      const plaidClient = new PlaidClient({ authToken: jwtToken });
      const response = await plaidClient.postSetPublicToken(public_token);
      console.log("**28 exchangePublicTokenForAccessToken", response)
      // We should handle the data in some kind of state?
    }
    exchangePublicTokenForAccessToken();
  }, [])

  // Error handling if user exits Link without connecting or otherwise some other error
  const onExit = useCallback((err, metadata) => {
    // Do something
  }, [])

  const onEvent = useCallback((eventName, metaData) => {
    // Log data
    console.info(eventName);
    console.info(metaData)
  })
  const handleLinkButtonClicked = useCallback((open) => {
    props.onLinkButtonClicked && props.onLinkButtonClicked()
    if (open) open();
  }, [])

  let isOauth = false;
  const plaidConfig = {
    token: props.linkToken,
    receivedRedirectUri: null,
    onSuccess,
    onExit,
    onEvent
  }

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    plaidConfig.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(plaidConfig);
  return (
    // Plaid button
    <StyledCustomPlaidButton 
      type="button"
      onClick={() => handleLinkButtonClicked(open)} // Open is a function
      disabled={!ready}
      variant="contained"
      startIcon={<AccountBalanceIcon />}
      {...props}
    >
      Connect your financial data
    </StyledCustomPlaidButton>
  )
}

export default PlaidLinkWidget;
