import React from 'react';
import { Box } from '@mui/material';
import { STRING_HELPERS } from '../../../../../../utils/string-helpers';
import { AttributeComponent } from '../AttributeComponent';
import { StyledFinancialItemCard } from '../../StyledLiabilityCard';
import { ConversionType } from '../../../../application-field-conversion-type';
// This is one mortgage liability item. It could be arranged in an array
/**
 *
 * @param {{
 * account_id: string
 * account_number: string
 * origination_principal_amount: number
 * next_monthly_payment: number
 * loan_term: string
 * property_address: Object
 * ytd_principal_paid: number
 * interest_rate: Object
 * }} props
 * @returns
 */
function MortgageLiabilityCard(props) {
	const {
		account_id,
		account_number,
		origination_principal_amount,
		next_monthly_payment,
		loan_term,
		property_address,
		ytd_principal_paid,
		interest_rate,
	} = props;
	const extractedData = {
		account_id,
		account_number,
		origination_principal_amount: STRING_HELPERS.toCurrency(
			origination_principal_amount
		),
		interest_rate: { type: ConversionType.fromObject, data: interest_rate }, // This is an object
		next_monthly_payment: STRING_HELPERS.toCurrency(next_monthly_payment),
		loan_term,
		property_address: {
			type: ConversionType.fromObject,
			data: property_address,
		}, // this is an object
		ytd_principal_paid: STRING_HELPERS.toCurrency(ytd_principal_paid),
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

export default MortgageLiabilityCard;
