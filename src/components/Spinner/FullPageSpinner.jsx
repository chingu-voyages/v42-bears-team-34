import React from 'react';
import { Box } from '@mui/material';
import Spinner from './Spinner';
import { PALLET } from '../../stylings/pallet';

export function FullPageSpinner() {
  return (
    <Box
      position={'absolute'}
      zIndex={10}
      width={'100vw'}
      height={'100vh'}
      bgcolor={PALLET.applicationDetails.backgroundColor}
      sx={{ opacity: 0.8 }}
    >
      <Box margin={'50%'} marginTop={'30%'}>
        <Spinner />
      </Box>
    </Box>
  );
}
