import { Spinner } from "../../../Spinner";
import { StyledGridContainer } from "../StyledGridContainer";
import AccountsContainerCard from "./accounts/AccountsContainerCard";

/**
 * Render the plaid financial info data. Also errors and loading state are passed to this
 * to show a spinner or any UI feedback
 * @param {{
 * isLoading: boolean
 * data: any
 * errorInfo: { error: boolean, message: string }
 * }} props 
 * @returns 
 */
function FinancialDetailsContainerComponent (props) {
  const { isLoading, data, errorInfo } = props;

  if (!data) {
    return (
      <StyledGridContainer title="Financial Details">

      </StyledGridContainer>
    )
  }
  const { accounts = {} } = data;
  return (
    <StyledGridContainer title="Financial Details">
       {isLoading && (
        <Spinner />
       )}
       <AccountsContainerCard accounts={accounts} />
    </StyledGridContainer>
  )
}

export default FinancialDetailsContainerComponent;
