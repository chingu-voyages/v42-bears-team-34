import { styled, Box } from '@mui/material';
export const StyledResponsiveBox = styled(Box)((props) => ({
  padding: '3%',
  [props.theme.breakpoints.up('sm')]: {
    marginLeft: '20%',
    marginRight: '20%',
  },
}));
