import { CustomizedStyledGridItem } from "../../../../CustomStyledGridItem/CustomStyledGridItem";
import { AccountItem } from "./AccountItem";

/*
Holds many accounts content
Displays account name, available & current balances and limit if applicable
*/

/**
 * Pass the array of accounts to this, and it should render the details
 * @param {{ accounts: { name: string, balances: { available: number, current: number, iso_currency_code: string, limit: number,  subtype: string }}[]}} props 
 * @returns 
 */
function AccountsContainerCard (props) {
  const { accounts = [] } = props;
  return (
    <CustomizedStyledGridItem title="Accounts">
      {/* Do we really need to see all of their accounts? TODO: Filter out accounts to only what's pertinent */}
      { accounts && accounts.map((account) => (
        <AccountItem {...{...account}} />
      ))}
    </CustomizedStyledGridItem>
  )
}

export default AccountsContainerCard;
