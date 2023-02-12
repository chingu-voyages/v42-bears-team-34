import { Box, Grid} from "@mui/material";
import { FIELD_DICT, SIGNUP_FIELDS } from "../../../pages/signup/sign-up-fields";
import { STRING_HELPERS } from "../../../utils/string-helpers";
import { StyledGridItem } from "./StyledGridItem";
import { StyledGridContainer } from "./StyledGridContainer";
import { PALLET } from "../../../stylings/pallet";
/**
 * 
 * @param {{
 * requestedLoanAmount: number,
 * installmentAmount: number,
 * numberOfInstallments: number,
 * loanPurpose: string,
 * status: string,
 * requestedAt: DateString,
 * rejectedReason?: string,
 * applicantIncome: number
 * }} props 
 * @returns 
 */
export const ApplicationDetailsSectionComponent = (props) => {
  const { requestedLoanAmount, installmentAmount, numberOfInstallments, loanPurpose, status, rejectedReason, requestedAt, applicantIncome } = props;
  return (
    <StyledGridContainer container title="Application Details">
       <Grid item>
        <StyledGridItem headerText={FIELD_DICT[SIGNUP_FIELDS.applicantIncome]} subText={STRING_HELPERS.formatToCurrency(applicantIncome)} />
      </Grid>
      <Grid item>
        <StyledGridItem headerText={FIELD_DICT[SIGNUP_FIELDS.requestedLoanAmount]} subText={STRING_HELPERS.formatToCurrency(requestedLoanAmount)} />
      </Grid>
        <StyledGridItem headerText={FIELD_DICT[SIGNUP_FIELDS.installmentAmount]} subText={STRING_HELPERS.formatToCurrency(installmentAmount)} />
      <Grid item>
      </Grid>
      <Grid item>
        <StyledGridItem headerText={FIELD_DICT[SIGNUP_FIELDS.numberOfInstallments]} subText={numberOfInstallments} />
      </Grid>
      <Grid item>
        <StyledGridItem headerText={FIELD_DICT[SIGNUP_FIELDS.loanPurpose]} subText={STRING_HELPERS.capitalizeFirstLetter(loanPurpose)} />
      </Grid>
      <Grid item>
        <StyledGridItem headerText={"Application Status"} subText={status.toUpperCase()} />
      </Grid>
      <Grid item>
        <StyledGridItem headerText={"Date of Application"} subText={STRING_HELPERS.formatDate(requestedAt)} />
      </Grid>
      { rejectedReason && (
        <Grid item>
          <StyledGridItem headerText={FIELD_DICT[SIGNUP_FIELDS.rejectedReason]} subText={rejectedReason} />
        </Grid>
      )}
    </StyledGridContainer>
  )
}
