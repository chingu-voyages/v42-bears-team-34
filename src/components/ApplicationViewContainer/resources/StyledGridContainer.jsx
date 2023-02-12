import { Grid, styled, Box, Typography } from '@mui/material';

export const CustomGridContainer = styled(Grid)((props) => ({
  "&.MuiGrid-root": {
    padding: "4rem",
    backgroundColor: props.backgroundColor || "white"
  }
}))

export function StyledGridContainer(props) {
  const { spacing, title, container } = props;
  return (
    <>
      <CustomGridContainer {...props} container={container} spacing={spacing}>
        <Grid container>
          {title && (
            <Box>
              <Typography variant='h5' fontWeight={"bold"}>{title}</Typography>
            </Box>
          )}
        </Grid>
        {props.children}
      </CustomGridContainer>
    </>
  )
}
