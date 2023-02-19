import { Typography, Box } from '@mui/material';
import AccountsAccordion from './AccountsAccordion';

/*
Holds many accounts content
Displays account name, available & current balances and limit if applicable
*/

/**
 * Pass the array of accounts to this, and it should render the details
 * @param {{ title, accounts: { name: string, balances: { available: number, current: number, iso_currency_code: string, limit: number,  subtype: string }}[]}} props
 * @returns
 */
function AccountsContainerComponent(props) {
  const { accounts = [], title } = props;
  return (
    <Box mt={2}>
      {title && <Typography>{title}</Typography>}
      <AccountsAccordion
        accountsArray={accounts}
        summaryTitle={'Accounts'}
        summaryTitleStyles={{ fontWeight: 'bold' }}
        summarySubText={
          accounts && accounts.length ? `(${accounts.length}) found` : ''
        }
      />
    </Box>
  );
}

export default AccountsContainerComponent;
