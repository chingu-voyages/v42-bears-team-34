import { Paper, styled } from '@mui/material';
import { PALLET } from '../../../../stylings/pallet';
export const StyledFinancialItemCard = styled(Paper)(() => ({
  '&.MuiPaper-root': {
    backgroundColor: PALLET.paleGoldYellow,
    padding: '10px',
    maxWidth: 'min-content',
  },
}));
