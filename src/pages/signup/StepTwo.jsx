import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { SIGNUP_FIELDS } from "./sign-up-fields";
import { ErrorComponent } from "../../components/ErrorComponent";

export default function StepTwo(props) {
  const [inputs, setInputs] = useState({
    [SIGNUP_FIELDS.email]: "",
    [SIGNUP_FIELDS.password1]: "",
    [SIGNUP_FIELDS.password2]: ""
  })

  const handleChange = (e) => {
      e.preventDefault();
      setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }))
  }
  useEffect(() => {
      props.onStepDataChange && props.onStepDataChange(
        inputs
      )
  }, [inputs])

  return (
    <div> 
      <div>
        <TextField 
          sx={{width:400}}
          type="email"
          name={SIGNUP_FIELDS.email}
          label="Email"
          margin="normal"
          variant="outlined"
          color="secondary"
          value={inputs[SIGNUP_FIELDS.email]}
          onChange={handleChange} 
        />
        {props.errors && props.errors[SIGNUP_FIELDS.email] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.email]} />}
      </div>
      <div>
        <TextField 
          sx={{width:400}}
          type="password"
          name={SIGNUP_FIELDS.password1}
          label="Create a password"
          margin="normal"
          variant="outlined"
          color="secondary"
          value={inputs[SIGNUP_FIELDS.password1]}
          onChange={handleChange}
        />
        {props.errors && props.errors[SIGNUP_FIELDS.password1] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.password1]} />}
      </div>
      <div>
        <TextField 
          sx={{width:400}}
          type="password" 
          name={SIGNUP_FIELDS.password2}
          label="Confirm password"
          margin="normal"
          variant="outlined"
          color="secondary"
          value={inputs[SIGNUP_FIELDS.password2]}
          onChange={handleChange}
        />
        {props.errors && props.errors[SIGNUP_FIELDS.password2] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.password2]} />}
      </div>
    </div>
  )
}
