import { Box, TextField, styled, Button, Typography } from "@mui/material";
import { PALLET } from "../../stylings/pallet";
import { StyledButton } from "../StyledButton";
import { useRef, useState } from "react";
import { STRING_HELPERS } from "../../utils/string-helpers";


const StyledFormBox = styled(Box)(( props) => ({
  [props.theme.breakpoints.up("md")]: {
    "borderColor": PALLET.charcoal,
    "borderWidth": "1px",
    "borderStyle": "solid",
    "boxShadow": "7px 6px 15px -3px",
    "padding": "50px",
    backgroundColor: PALLET.white
  },
}));

const StyledTextFieldBox = styled(Box)((props) => ({
  [props.theme.breakpoints.down("md")]: {
    "input": {
      backgroundColor: PALLET.white
    },
  },
  [props.theme.breakpoints.up("md")]: {
    "marginTop": "60px",
  }
}))

const marginBottomSpacing = 1
/**
 * Sign in form to be used for user and admin login.
 * This can be nested in a modal or on a page itself,
 * 
 */
function LoginComponent(props) {
  const formDataRef = useRef({}); // Keep track of textInput values
  const handleLoginSubmit = () => {
    clearErrorState();
    if (!validateInputs()) return;
    props && props.onSubmit && props.onSubmit(formDataRef.current)
  }

  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [emailErrorText, setEmailErrorText] = useState("");
  const handleInputsChanged = (event) => {
    formDataRef.current = {
      ...formDataRef.current,
      [event.target.name]: event.target.value
    }
    setSubmitDisabled(!checkHasInput())
  }

  const validateInputs = () => {
    if (formDataRef.current["email"] === "") {
      setHasEmailError(true);
      return false;
    }
    if (!STRING_HELPERS.isEmailValid(formDataRef.current["email"])) {
      setHasEmailError(true);
      setEmailErrorText("Enter a valid e-mail address")
      return false;
    }
    if (formDataRef.current["password"] === "") {
      setHasPasswordError(true);
      return false;dd
    }
    return true;
  }

  const checkHasInput = () => {
    if (!formDataRef.current) return false;
    if (!formDataRef.current["email"]) return false;
    if (formDataRef.current["email"].trim() === "") return false;
    if (!formDataRef.current["password"]) return false;
    if (formDataRef.current["password"].trim() === "") return false;
    return true;
  }
  const clearErrorState = () => {
    setEmailErrorText("");
    setHasEmailError(false);
    setHasPasswordError(false);
  }
  return (
    <StyledFormBox 
      component="form"
      autoComplete="on"
    >
      <Box>
        <Box
          display={"flex"}
          justifyContent="center"
          mb={marginBottomSpacing}
        >
          {/* Holds the title */}
          <Typography
            variant="h2"
          >
            {props.title || "Login Portal"}
          </Typography>
        </Box>
        <StyledTextFieldBox>
          <TextField
            sx={{ "mb": marginBottomSpacing }}
            id="email"
            name="email"
            type={"email"}
            label="E-mail Address"
            placeholder="example@example.com"
            onChange={handleInputsChanged}
            helperText={emailErrorText}
            required
            error={hasEmailError}
            fullWidth
          />
          <TextField
            sx={{ "mb": marginBottomSpacing}}
            id="password"
            name="password"
            type={"password"}
            label="Password"
            error={hasPasswordError}
            required
            onChange={handleInputsChanged}
            fullWidth
          />
        </StyledTextFieldBox>
        <Box 
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <StyledButton label="Login" 
            onClick={handleLoginSubmit}
            disabled={submitDisabled}
            buttonColor={PALLET.mountainDewLime}
          />
        </Box>
      </Box> 
    </StyledFormBox>
  )
}

export default LoginComponent;
