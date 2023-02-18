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
          onAdminOptionsClick,
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

  const handleMoreAdminOptionsClicked = useCallback(() => {
    onAdminOptionsClick && onAdminOptionsClick()
  })

  return (
    <Box display="flex" justifyContent={"center"} pl={2} pr={2}>
      <Box>
        <Box p={2} display={"flex"} justifyContent={"center"}>
          <StyledButton
            borderRadius="20px"
            buttonColor={PALLET.mountainDewLime}
            label={"Get Financial Details"}
            onClick={handleFetchFinancialDataClick}
            disabled={fetchButtonDisabled}
          />
        </Box>
        <Box display="flex" p={2} justifyContent={"space-evenly"}>
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
          <StyledButton 
            borderRadius="20px"
            buttonTextColor={PALLET.white}
            buttonColor={PALLET.pineGreen}
            label={"More Admin Options..."}
            onClick={handleMoreAdminOptionsClicked}
          />
        </Box>
      </Box>
    </Box>
  )
}
