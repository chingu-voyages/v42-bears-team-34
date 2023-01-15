import { Button, styled } from "@mui/material";
import { PALLET } from "../../stylings/pallet";

const MuiStyledButton = styled(Button)(({ ...props }) => ({
  "backgroundColor": props.buttonColor,
  "color": props.buttonTextColor || PALLET.charcoal,
  "borderRadius": props.borderRadius
}))

/**
 * 
 * @param {label}} string: button label
 * @parm {onClick } optional callback function for when button is clicked 
 * @returns React.JSX Element
 */
function StyledButton (props) {
  const handleOnClick = () => {
    onClick && onClick();
  }
  return (
    <MuiStyledButton
      variant="contained"
      onClick={handleOnClick}
      {...props}
    >
      {props.label}
    </MuiStyledButton>
  )
}

export default StyledButton;
