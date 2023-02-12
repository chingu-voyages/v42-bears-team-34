import { Alert, AlertTitle, Box } from "@mui/material";

/**
 * Generic Error message display
 * @param {{ message: string }} props 
 * @returns 
 */
function ErrorMessage (props) {
  const { message } = props;
  return (
    <Box>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message || "An unknown error occurred"}
      </Alert>
    </Box>
  )
}

export default ErrorMessage;
