import { styled, Box } from '@mui/material';
import { PALLET } from '../../stylings/pallet';
export const StyledResponsiveBox = styled(Box)((props) => ({
  backgroundColor: PALLET.applicationDetails.backgroundColor,
  padding: '3%',
  [props.theme.breakpoints.up('sm')]: {
    marginLeft: '20%',
    marginRight: '20%',
  },
}));
