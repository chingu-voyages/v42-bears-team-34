import { styled, Box } from '@mui/material';
import { PALLET } from '../../stylings/pallet';
export const StyledTextFieldBox = styled(Box)((props) => ({
  [props.theme.breakpoints.down('md')]: {
    input: {
      backgroundColor: PALLET.white,
    },
  },
  [props.theme.breakpoints.up('md')]: {
    marginTop: '60px',
  },
}));
