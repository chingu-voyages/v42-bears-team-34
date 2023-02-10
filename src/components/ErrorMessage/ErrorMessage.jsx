import { Alert, AlertTitle, Box } from "@mui/material";

/**
 * Generic Error message display
 * @param {{ message: string }} props 
 * @returns 
 */
function ErrorMessage (props) {
  return (
    <Box>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {props.message || "An unknown error occurred"}
      </Alert>
    </Box>
  )
}

export default ErrorMessage;
