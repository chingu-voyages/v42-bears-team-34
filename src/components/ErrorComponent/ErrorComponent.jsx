import { Alert } from "@mui/material";

/**
 * 
 * @param {{ title: string }} props 
 * @returns 
 */
function ErrorComponent(props) {
  return (
    <div>
      <Alert severity="error">
        {props.title || "Unknown error"}
      </Alert>
    </div>
  )
}

export default ErrorComponent;
