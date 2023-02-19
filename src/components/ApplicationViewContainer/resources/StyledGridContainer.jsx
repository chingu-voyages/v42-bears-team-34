import React from 'react';
import { Grid, styled, Box, Typography } from '@mui/material';

export const CustomGridContainer = styled(Grid)(() => ({
  '&.MuiGrid-root': {
    padding: '4rem',
    backgroundColor: 'inherit',
  },
}));

export function StyledGridContainer(props) {
  const { spacing, title, container, icon } = props;
  return (
    <>
      <CustomGridContainer {...props} container={container} spacing={spacing}>
        <Grid container>
          {title && (
            <Box display="flex" justifyContent={'space-between'}>
              <>{icon && { ...icon }}</>
              <Typography variant="h5" fontWeight={'bold'} ml={2}>
                {title}
              </Typography>
            </Box>
          )}
        </Grid>
        {props.children}
      </CustomGridContainer>
    </>
  );
}
