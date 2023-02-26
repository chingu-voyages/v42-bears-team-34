import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaidClient } from '../../../services/api-clients/plaid-client';
import { TokenManager } from '../../../services/token-manager/token-manager';
import PlaidLinkContainer from '../../PlaidLinkWidget/PlaidLinkContainer';
import { StyledResponsiveBox } from '../StyledResponsiveBox';
import { Box } from '@mui/material';
import { ErrorComponent } from '../../ErrorComponent';
/**
 * This allows user to re-connect their financial data with plaid link
 */

/**
 *
 * @param {{ onCompleted: () =>void, onAbort: ()=> void }} props
 * @returns
 */
function PlaidUpdater(props) {
  const [linkToken, setLinkToken] = useState(null);
  const [linkTokenError, setLinkTokenError] = useState({
    error: false,
    message: null,
  });
  const { onComplete, onAbort } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const getLinkToken = async () => {
      const jwtToken = TokenManager.getToken();
      if (!jwtToken) {
        navigate('/home');
        return;
      }
      try {
        const plaidClient = new PlaidClient({ authToken: jwtToken });
        const plaidLinkTokenResponse = await plaidClient.getLinkToken();
        setLinkToken(plaidLinkTokenResponse.link_token);
      } catch (error) {
        setLinkTokenError({
          error: true,
          message: 'The operation failed',
        });
        console.log(error);
      }
    };
    getLinkToken();
  }, []);

  const handleAbort = useCallback(() => {
    // Handle abort
    onAbort && onAbort();
  });
  const handlePlaidSuccessComplete = useCallback(() => {
    // Handle success
    onComplete && onComplete();
  });
  return (
    <Box display="flex" justifyContent={'center'}>
      <StyledResponsiveBox>
        <PlaidLinkContainer
          linkToken={linkToken}
          onAbort={handleAbort}
          onPlaidSuccessComplete={handlePlaidSuccessComplete}
        />
      </StyledResponsiveBox>
      {linkTokenError.error && (
        <ErrorComponent title={linkTokenError.message} />
      )}
    </Box>
  );
}

export default PlaidUpdater;
