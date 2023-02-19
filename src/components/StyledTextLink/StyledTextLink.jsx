import React from 'react';
import { styled, Typography } from '@mui/material';
import { PALLET } from '../../stylings/pallet';

const CustomTypography = styled(Typography)(() => ({
  '&:hover': {
    cursor: 'pointer',
    color: PALLET.pineGreen,
  },
  color: 'blue',
}));

/**
 *
 * @param {{ text: string, url: string, navigate: ()=> void }}} props
 * @returns
 */
function StyledTextLink(props) {
  const { text, url, navigate } = props;
  return (
    <CustomTypography onClick={() => navigate(url, { replace: true })}>
      {text}
    </CustomTypography>
  );
}

export default StyledTextLink;
