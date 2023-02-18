import { Box, Grid, Typography, Tooltip } from "@mui/material";
import { FIELD_DICT, SIGNUP_FIELDS } from "../../../pages/signup/sign-up-fields";
import { STRING_HELPERS } from "../../../utils/string-helpers";
import { StyledGridItem } from "./StyledGridItem";
import { StyledGridContainer } from "./StyledGridContainer";
import ApplicationDetailsSharpIcon from '@mui/icons-material/DescriptionSharp';
import { PALLET } from "../../../stylings/pallet";
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
/**
 * 
 * @param {{
 * requestedLoanAmount: number,
 * installmentAmount: number,
 * numberOfInstallments: number,
 * loanPurpose: string,
 * status: string,
 * requestedAt: DateString,
 * updatedAt: DateString,
 * rejectedReason?: string,
 * applicantIncome: number,
 * statusMessage?: string
 * }} props 
 * @returns 
 */
export const ApplicationDetailsSectionComponent = (props) => {
  const { requestedLoanAmount, installmentAmount, numberOfInstallments, loanPurpose, status, rejectedReason, requestedAt, applicantIncome, updatedAt, statusMessage } = props;
  return (
    <Box>
      <StyledGridContainer justifyContent={"space-evenly"} container title="Application Details" icon={<ApplicationDetailsSharpIcon fontSize="large" sx={{ color: PALLET.pineGreen }} />} >
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
          <StyledGridItem headerText={FIELD_DICT["updatedAt"]} subText={STRING_HELPERS.formatDate(updatedAt)} />
        </Grid>
        <Grid item>
          <StyledGridItem headerText={"Date of Application"} subText={STRING_HELPERS.formatDate(requestedAt)} />
        </Grid>
      </StyledGridContainer>
      <Box>
        {/* This section is for the application status and any rejection reasons. We can also play with the color status 
        If status is rejected, we can display a little applet that has the reason pop up
        */}
        <Typography textAlign={"center"} fontWeight={"bold"} variant="h5">
          Application Status
        </Typography>
        { status != "rejected" && (
          <Typography textAlign={"center"} variant="h5" fontWeight={"bold"} color={renderStatusColor(status)}>{FIELD_DICT.applicationStatus[status].toUpperCase()}</Typography>
        )}
        { statusMessage && (
          <SpecialStatusApplet message={statusMessage} status={status} />
        )}
        { status === "rejected" && (
          <RejectedReasonApplet reason={rejectedReason} status={status} />
        )}
      </Box>
    </Box>
  )
}

const SpecialStatusApplet = (props) => {
  const { message, status } = props;
  return (
    <Box display="flex" justifyContent={"center"}>
      <Box display="flex">
        <InfoSharpIcon sx={{ color: renderStatusColor(status)}} />
        <Typography>{message}</Typography>
      </Box>
    </Box>
  )
}

/**
 * 
 * @param {{ reason?: string }} props 
 * @returns 
 */
const RejectedReasonApplet = (props) => {
  const { reason, status } = props;
  return (
    <Box mt={2  }>
      <Box display="flex" justifyContent={"center"}>
        <Tooltip title={reason || "The application was rejected."}>
          <HelpSharpIcon sx={{ color: PALLET.application.rejected }} />
        </Tooltip>
        <Typography ml={2} textAlign={"center"} variant="h5" fontWeight={"bold"} color={renderStatusColor(status)}>{status.toUpperCase()}</Typography>
      </Box>
    </Box>
  )
}

const renderStatusColor = (status) => {
  switch (status) {
    case "pending":
      return PALLET.application.pending;
    case "rejected":
      return PALLET.application.rejected;
    case "approved":
      return PALLET.application.approved;
    case "more_info_required": 
      return PALLET.application.more_info_required
    default:
      return "black"
  }
}
