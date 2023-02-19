import React, { useCallback } from 'react';
import {
  styled,
  Paper,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from '@mui/material';
import { PALLET } from '../../../stylings/pallet';
import { FIELD_DICT, SIGNUP_FIELDS } from '../../signup/sign-up-fields';
import { ApplicationSummaryTableRow } from '../application-summary-table-row/ApplicationSummaryTableRow';
import { headerCellStyles } from '../header-cell-style/header-cell-style';

const StyledTableHeaderCell = styled(TableCell)(() => ({
  ...headerCellStyles,
}));

const CustomStyledTableContainer = styled(TableContainer)(() => ({}));

export function ApplicationsList(props) {
  const { userApplications, onApplicationClicked } = props;

  const handleApplicationClicked = useCallback((id) => {
    onApplicationClicked && onApplicationClicked(id);
  });

  return (
    <CustomStyledTableContainer component={Paper}>
      <Table
        sx={{ backgroundColor: PALLET.applicationDetails.backgroundColor }}
        aria-label="applications table"
      >
        <TableHead>
          <TableRow>
            <StyledTableHeaderCell>Status</StyledTableHeaderCell>
            <StyledTableHeaderCell>Date</StyledTableHeaderCell>
            <StyledTableHeaderCell>Name</StyledTableHeaderCell>
            <StyledTableHeaderCell>
              {FIELD_DICT[SIGNUP_FIELDS.applicantGender]}
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              {FIELD_DICT[SIGNUP_FIELDS.city]}
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              {FIELD_DICT[SIGNUP_FIELDS.province]}
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              {FIELD_DICT[SIGNUP_FIELDS.requestedLoanAmount]}{' '}
            </StyledTableHeaderCell>
            <StyledTableHeaderCell>
              {FIELD_DICT[SIGNUP_FIELDS.applicantIncome]}
            </StyledTableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userApplications &&
            userApplications.map((app) => (
              <ApplicationSummaryTableRow
                key={app.id}
                {...{ ...app }}
                onApplicationClicked={handleApplicationClicked}
              />
            ))}
        </TableBody>
      </Table>
    </CustomStyledTableContainer>
  );
}
