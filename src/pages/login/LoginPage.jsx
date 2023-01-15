import { Box, styled } from "@mui/material";
import { LoginComponent } from "../../components/LoginComponent";
import "./style.css";
const ResponsiveParentContainer = styled(Box)((props) => ({
  "marginTop": "50px",
  [props.theme.breakpoints.up("md")]: {
    "marginTop": "200px",
    "marginLeft": "5rem",
    "marginRight": "5rem"
  },
  [props.theme.breakpoints.up("lg")]: {
    "marginLeft": "30vw",
    "marginRight": "30vw"
  }
}))
/**
 * Generic login page for use with admin or user
 * @returns JSX.Element
 */
function LoginPage () {
  return (
    <ResponsiveParentContainer>
      <LoginComponent />
    </ResponsiveParentContainer>
  )
}

export default LoginPage;
