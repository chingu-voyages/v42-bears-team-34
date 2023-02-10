import { Box, Typography } from "@mui/material"
import { useCallback, useContext } from "react";
import PlaidLinkWidget from "../../components/PlaidLinkWidget/Plaid-link-widget";
import AppContext from "../../context/AppContext";
/**
 * The
 * @param {{ linkToken: string }} props 
 * @returns 
 */
export default function PlaidLinkPage (props) {
  const { linkToken } = useContext(AppContext);
  const handleLinkSuccess = useCallback(() => {
    // Do something with the success state. Maybe do a summary page or render an APPLY or DONE button?
    console.log("Plaid Link was completed");
    // Show the summary page on success
  },[])
  return (
    <Box>
      <Box mt={5} mb={5}>
        <Typography>
          Click on the button below to link your financial information
        </Typography>
      </Box>
      <PlaidLinkWidget linkToken={linkToken} onLinkButtonClicked={()=> console.log("link button clicked")} onPlaidSuccessComplete={handleLinkSuccess} />
    </Box>
  )
}
