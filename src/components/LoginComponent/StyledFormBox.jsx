import { PALLET } from '../../stylings/pallet';
import { Box, styled } from '@mui/material';
export const StyledFormBox = styled(Box)((props) => ({
  [props.theme.breakpoints.up('md')]: {
    borderColor: PALLET.charcoal,
    borderWidth: '1px',
    borderStyle: 'solid',
    boxShadow: '7px 6px 15px -3px',
    padding: '50px',
    backgroundColor: PALLET.white,
  },
}));
