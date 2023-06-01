import React from 'react';
import { Alert, styled } from '@mui/material';

const StyledAlertComponent = styled(Alert)(() => ({
  '&.MuiPaper-root': {
    border: 'none',
    padding: '0px'
  },
}));

/**
 *
 * @param {{ title: string }} props
 * @returns
 */
function ErrorComponent(props) {
  return (
    <div>
      <StyledAlertComponent severity="error" variant="outlined">
        {props.title || 'Unknown error'}
      </StyledAlertComponent>
    </div>
  );
}

export default ErrorComponent;
