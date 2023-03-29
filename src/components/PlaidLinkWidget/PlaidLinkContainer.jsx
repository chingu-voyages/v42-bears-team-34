import React from 'react';
import { Box, Typography } from '@mui/material';
import PlaidLinkWidget from './Plaid-link-widget';

/**
 *
 * @param {{ prompt: string, linkToken: string, onPlaidSuccessComplete: (itemId: string) => void, onAbort: ()=> void}} props
 * @returns
 */
function PlaidLinkContainer(props) {
  const { prompt, linkToken, onPlaidSuccessComplete, onAbort } = props;
  return (
    <Box>
      <Box mt={5} mb={5}>
        <Typography>{prompt}</Typography>
      </Box>
      <PlaidLinkWidget
        linkToken={linkToken}
        onPlaidSuccessComplete={onPlaidSuccessComplete}
        onAbort={onAbort}
      />
    </Box>
  );
}
export default PlaidLinkContainer;
