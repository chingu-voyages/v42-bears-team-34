import { Box } from "@mui/material";
import { useCallback } from "react";
import { PALLET } from "../../../stylings/pallet";
import StyledButton from "../../StyledButton/StyledButton";

/**
 * Admin controls, fetch plaid financial, approve decline
 * @param {{ onFetchFinancialDataClick: ()=> void
 * onApproveClick: ()=> void
 * onRejectClick: ()=> void
 * fetchButtonDisabled?: boolean
 * approveButtonDisabled?: boolean
 * rejectButtonDisabled?: boolean
 *  }} props 
 * @returns 
 */
export function AdminControlsComponent(props) {
  const { onFetchFinancialDataClick, 
          onApproveClick, 
          onRejectClick,
          fetchButtonDisabled,
          approveButtonDisabled,
          rejectButtonDisabled
        } = props;

  const handleFetchFinancialDataClick = useCallback(() => {
    onFetchFinancialDataClick && onFetchFinancialDataClick();
  });

  const handleApproveClick = useCallback(() => {
    onApproveClick && onApproveClick();
  })

  const handleRejectedClick = useCallback(() => {
    onRejectClick && onRejectClick();
  })

  return (
    <Box display="flex" justifyContent={"center"}>
      <Box>
        <Box p={2}>
          <StyledButton
            borderRadius="20px"
            buttonColor={PALLET.mountainDewLime}
            label={"Get Financial Details"}
            onClick={handleFetchFinancialDataClick}
            disabled={fetchButtonDisabled}
          />
        </Box>
        <Box display="flex" p={2} justifyContent={"space-around"}>
          <StyledButton 
            borderRadius="20px"
            buttonTextColor={PALLET.white}
            buttonColor={PALLET.application.approved}
            onClick={handleApproveClick}
            label={"Approve"}
            disabled={approveButtonDisabled}
          />
          <StyledButton
            borderRadius="20px"
            buttonTextColor={PALLET.white}
            buttonColor={PALLET.application.rejected}
            label={"Reject"}
            disabled={rejectButtonDisabled}
            onClick={handleRejectedClick}
          />
        </Box>
      </Box>
    </Box>
  )
}
