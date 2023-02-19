import React from 'react';
import { Spinner } from '../../../Spinner';
import { NoInformationFound } from '../NoInformationFoundComponent';
import { StyledGridContainer } from '../StyledGridContainer';
import AccountsContainerComponent from './accounts/AccountsContainerComponent';
import FinancialDetailsSharpIcon from '@mui/icons-material/AccountBalanceSharp';
import LiabilitiesContainerComponent from './liabilities/LiabilitiesContainerComponent';
import { PALLET } from '../../../../stylings/pallet';

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
function FinancialDetailsContainerComponent(props) {
  const { isLoading, data, errorInfo } = props;

  if (!data) {
    return (
      <StyledGridContainer>
        <NoInformationFound title={errorInfo?.message || ''} />
      </StyledGridContainer>
    );
  }
  const { accounts = [], liabilities = {} } = data;
  return (
    <StyledGridContainer
      title={'Financial Details'}
      icon={
        <FinancialDetailsSharpIcon
          fontSize="large"
          sx={{ color: PALLET.pineGreen }}
        />
      }
    >
      {isLoading && <Spinner />}
      {/* <AccountsContainerCard accounts={accounts} title="Accounts" /> */}
      <AccountsContainerComponent accounts={accounts} title={'Accounts'} />
      <LiabilitiesContainerComponent
        liabilities={liabilities}
        title="Liabilities"
      />
    </StyledGridContainer>
  );
}

export default FinancialDetailsContainerComponent;
