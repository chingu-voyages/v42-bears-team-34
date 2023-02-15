
import { Box } from "@mui/material";
import { STRING_HELPERS } from "../../../../../../utils/string-helpers";

import { AttributeComponent } from "../AttributeComponent";
import { StyledFinancialItemCard } from "../../StyledLiabilityCard";
import { ConversionType } from "../../../../application-field-conversion-type";
// This is one student loan liability item. It could be arranged in an array
/**
 * 
 * @param {{
 * account_id: string
 * account_number: string
 * disbursement_dates: string[]
 * expected_payoff_date: string
 * guarantor: string
 * interest_rate_percentage: number
 * is_overdue: boolean
 * last_payment_amount: number
 * last_payment_date: string
 * last_statement_balance: string
 * last_statement_issue_date: string
 * loan_name: string
 * loan_status: Object
 * origination_principal_amount: number
 * outstanding_interest_amount: number
 * pslf_status: Object
 * repayment_plan: Object
 * ytd_interest_paid: number
 * ytd_principal_paid: number
 * }} props 
 * @returns 
 */
function StudentLiabilityCard (props) {
  const { 
    account_id, 
    account_number,
    disbursement_dates,
    expected_payoff_date,
    guarantor,
    interest_rate_percentage,
    is_overdue,
    last_payment_amount,
    last_payment_date,
    last_statement_balance,
    last_statement_issue_date,
    loan_name,
    loan_status,
    origination_principal_amount,
    outstanding_interest_amount,
    pslf_status,
    repayment_plan,
    ytd_interest_paid,
    ytd_principal_paid
  } = props;
  const extractedData = {
    account_id,
    account_number,
    disbursement_dates: JSON.stringify(disbursement_dates),
    expected_payoff_date,
    guarantor,
    interest_rate_percentage,
    is_overdue,
    last_payment_amount: STRING_HELPERS.toCurrency(last_payment_amount),
    last_payment_date,
    last_statement_balance: STRING_HELPERS.toCurrency(last_statement_balance),
    last_statement_issue_date,
    loan_name,
    loan_status: { type: ConversionType.fromObject, data: loan_status },
    origination_principal_amount: STRING_HELPERS.toCurrency(origination_principal_amount),
    outstanding_interest_amount: STRING_HELPERS.toCurrency(outstanding_interest_amount),
    pslf_status: { type: ConversionType.fromObject, data: pslf_status },
    repayment_plan: { type: ConversionType.fromObject, data: repayment_plan },
    ytd_interest_paid: STRING_HELPERS.toCurrency(ytd_interest_paid),
    ytd_principal_paid: STRING_HELPERS.toCurrency(ytd_principal_paid),
  }
  return (
    <Box>
      <StyledFinancialItemCard elevation={1}>
        {extractedData && Object.entries(extractedData).map(( [key, value] ) => (
          <AttributeComponent key={key} propName={key} propValue={value} />
        ))}
      </StyledFinancialItemCard>
    </Box>
  )
}

export default StudentLiabilityCard;
