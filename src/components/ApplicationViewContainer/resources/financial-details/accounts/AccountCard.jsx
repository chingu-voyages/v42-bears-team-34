import { Box } from '@mui/material';
import React from 'react';
import { AttributeComponent } from '../liabilities/AttributeComponent';
import { StyledFinancialItemCard } from '../StyledLiabilityCard';
import { ConversionType } from '../../../application-field-conversion-type';

// This will contain an account name, balance and available
// account name will be a bold title

/**
 *
 * @param {{ account_id: string, name: string, balances: Object, subtype: string, type: string }} props
 * @returns
 */
export const AccountCard = (props) => {
  const { account_id, name, balances, subtype, type } = props;

  const { available, current, iso_currency_code, limit } = balances;

  const extractedBalanceData = {
    available,
    current,
    iso_currency_code,
    limit,
  };
  const extractedData = {
    account_id,
    name,
    balances: { type: ConversionType.fromObject, data: extractedBalanceData }, //This is an object
    subtype,
    type,
  };
  return (
    <Box mt={0.5}>
      <StyledFinancialItemCard elevation={1}>
        {extractedData &&
          Object.entries(extractedData).map(([key, value]) => (
            <AttributeComponent key={key} propName={key} propValue={value} />
          ))}
      </StyledFinancialItemCard>
    </Box>
  );
};
