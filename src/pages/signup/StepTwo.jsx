import React, { useState, useEffect } from "react";
import { InputLabel, TextField } from "@mui/material";
import { SIGNUP_FIELDS } from "./sign-up-fields";
import { ErrorComponent } from "../../components/ErrorComponent";
import { SignupDataStore } from "../../services/SignupDataStore/signup-data-store";
import { CustomDatePicker } from "../../components/CustomDatePicker";
import dayjs from "dayjs";
import { STEP_STATE } from "./steps-state";

const MAX_ADULT_AGE = new dayjs().subtract(18, "year"); // Minimum adult age
export default function StepTwo(props) {
  const [inputs, setInputs] = useState(STEP_STATE[1])

  const handleChange = (e) => {
      e.preventDefault();
      setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
      }))
  }

  // Dates are handle differently
  const handleDateChange = (dateValue) => {
    setInputs((prevState) => ({
      ...prevState,
      [SIGNUP_FIELDS.dateOfBirth]: dateValue,
    }))
  }

  useEffect(() => {
      props.onStepDataChange && props.onStepDataChange(
        inputs
      )
  }, [inputs])

  // Preload any data from the sessionStorage
  useEffect(() => {
    setInputs(SignupDataStore.getData(Object.keys(inputs)))
  },[]);


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
          value={inputs[SIGNUP_FIELDS.email] || ""}
          onChange={handleChange} 
        />
        {props.errors && props.errors[SIGNUP_FIELDS.email] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.email]} />}
      </div>
      <div>
        <CustomDatePicker 
          labelId="date-of-birth-label" 
          label={"Date of Birth"}
          readOnly 
          name={SIGNUP_FIELDS.dateOfBirth}
          maxDate={MAX_ADULT_AGE}
          value={inputs[SIGNUP_FIELDS.dateOfBirth]}
          onDateChange={handleDateChange}
        />
        {props.errors && props.errors[SIGNUP_FIELDS.dateOfBirth] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.dateOfBirth]} />}
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
          value={inputs[SIGNUP_FIELDS.password1] || ""}
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
          value={inputs[SIGNUP_FIELDS.password2] || ""}
          onChange={handleChange}
        />
        {props.errors && props.errors[SIGNUP_FIELDS.password2] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.password2]} />}
      </div>
    </div>
  )
}
