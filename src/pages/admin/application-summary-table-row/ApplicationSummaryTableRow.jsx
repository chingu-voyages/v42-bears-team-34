import { TableRow, TableCell, styled } from '@mui/material';
import { useCallback } from 'react';
import { PALLET } from '../../../stylings/pallet';
import { STRING_HELPERS } from '../../../utils/string-helpers';
import { FIELD_DICT } from '../../signup/sign-up-fields';

const StyledTableRow = styled(TableRow)((props) => ({
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: PALLET.application.summaryRow.highlightColor,
	},
}));

/**
 * This returns summary card details. Clickable
 * @param {{ application: Object, user: Object}} props
 * @returns JSX.Element
 */
export function ApplicationSummaryTableRow(props) {
	const { application, user, onApplicationClicked } = props;
	const handleOnClick = useCallback(() => {
		onApplicationClicked && onApplicationClicked(application.id);
	});
	return (
		<StyledTableRow onClick={handleOnClick}>
			<TableCell
				sx={{ color: PALLET.application[application?.status] }}
				align="right"
			>
				{STRING_HELPERS.capitalizeFirstLetter(
					FIELD_DICT.applicationStatus[application?.status]
				)}
			</TableCell>
			<TableCell>{STRING_HELPERS.formatDate(application?.createdAt)}</TableCell>
			<TableCell align="right">
				{user?.lastName} {user?.firstName}
			</TableCell>
			<TableCell align="right">
				{STRING_HELPERS.capitalizeFirstLetter(user?.applicantGender)}
			</TableCell>
			<TableCell align="right">{user?.address?.city?.toUpperCase()}</TableCell>
			<TableCell align="right">
				{user?.address?.province?.toUpperCase()}
			</TableCell>
			<TableCell align="right">
				{STRING_HELPERS.toCurrency(application?.requestedLoanAmount)}
			</TableCell>
			<TableCell align="right">
				{STRING_HELPERS.toCurrency(application?.applicantIncome)}
			</TableCell>
		</StyledTableRow>
	);
}
