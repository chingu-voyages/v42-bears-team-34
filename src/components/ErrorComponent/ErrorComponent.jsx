import { Alert, styled } from "@mui/material";

const StyledAlertComponent = styled(Alert)((props) => ({
  "&.MuiPaper-root" : {
    border: "none"
  }
}))

/**
 * 
 * @param {{ title: string }} props 
 * @returns 
 */
function ErrorComponent(props) {
  return (
    <div>
      <StyledAlertComponent severity="error" variant="outlined">
        {props.title || "Unknown error"}
      </StyledAlertComponent>
    </div>
  )
}

export default ErrorComponent;
