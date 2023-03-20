import { styled, Box } from '@mui/material';
export const ResponsiveParentContainer = styled(Box)((props) => ({
  marginTop: '50px',
  [props.theme.breakpoints.up('md')]: {
    marginTop: '200px',
    marginLeft: '5rem',
    marginRight: '5rem',
  },
  [props.theme.breakpoints.up('lg')]: {
    marginLeft: '30vw',
    marginRight: '30vw',
  },
}));
