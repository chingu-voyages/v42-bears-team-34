import React from "react";
import { Box } from '@mui/material';
import { STRING_HELPERS } from '../../../../../../utils/string-helpers';
import { AttributeComponent } from '../AttributeComponent';
import { StyledFinancialItemCard } from '../../StyledLiabilityCard';
import { ConversionType } from '../../../../application-field-conversion-type';
// This is one credit liability item. It could be arranged in an array
/**
 *
 * @param {{
 * account_id: string
 * aprs: Object[]
 * is_overdue: boolean
 * last_payment_amount: number
 * last_payment_date: string
 * last_statement_balance: string
 * last_statement_issue_date: string
 * minimum_payment_amount: number
 * next_payment_due_date: string
 * }} props
 * @returns
 */
function CreditLiabilityCard(props) {
  const {
    account_id,
    aprs,
    is_overdue,
    last_payment_amount,
    last_payment_date,
    last_statement_balance,
    last_statement_issue_date,
    minimum_payment_amount,
    next_payment_due_date,
  } = props;
  const extractedData = {
    account_id,
    aprs: { type: ConversionType.fromArrayOfObjects, data: aprs },
    is_overdue,
    last_payment_amount: STRING_HELPERS.toCurrency(last_payment_amount),
    last_payment_date,
    last_statement_balance: STRING_HELPERS.toCurrency(last_statement_balance),
    last_statement_issue_date,
    minimum_payment_amount: STRING_HELPERS.toCurrency(minimum_payment_amount),
    next_payment_due_date,
  };
  return (
    <Box>
      <StyledFinancialItemCard elevation={1}>
        {extractedData &&
          Object.entries(extractedData).map(([key, value]) => (
            <AttributeComponent key={key} propName={key} propValue={value} />
          ))}
      </StyledFinancialItemCard>
    </Box>
  );
}

export default CreditLiabilityCard;
