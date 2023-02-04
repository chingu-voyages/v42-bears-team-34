import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SIGNUP_FIELDS } from "./sign-up-fields";
import { ErrorComponent } from "../../components/ErrorComponent";
import InputMask from "react-input-mask";
export default function StepOne(props) {
  const [inputs, setInputs] = useState({
    [SIGNUP_FIELDS.firstName]: "",
    [SIGNUP_FIELDS.lastName]: "",
    [SIGNUP_FIELDS.streetAddress]: "",
    [SIGNUP_FIELDS.city]: "",
    [SIGNUP_FIELDS.province]: "",
    [SIGNUP_FIELDS.postalCode]: "",
    [SIGNUP_FIELDS.phone]: ""
  })

  const handleChange = (e) => {
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
          type="text" 
          name={SIGNUP_FIELDS.firstName}
          label="First name" 
          margin="normal" 
          variant="outlined" 
          color="secondary" 
          value={inputs[SIGNUP_FIELDS.firstName]} 
          onChange={handleChange} 
        />
        {props.errors && props.errors[SIGNUP_FIELDS.firstName] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.firstName]}/>}
      </div>
      <div>
        <TextField
          sx={{width:400}} 
          type="text" 
          name={SIGNUP_FIELDS.lastName}
          label="Last name" 
          margin="normal" 
          variant="outlined" 
          color="secondary" 
          value={inputs[SIGNUP_FIELDS.lastName]}
          onChange={handleChange} 
        />
        {props.errors &&props.errors.lastName && <ErrorComponent title={props.errors.lastName}/>}
      </div>
      <div>
        <TextField 
          sx={{width:400}}
          type="text"
          name={SIGNUP_FIELDS.streetAddress}
          label="Street address" 
          margin="normal" 
          variant="outlined" 
          color="secondary"
          value={inputs[SIGNUP_FIELDS.streetAddress]} 
          onChange={handleChange} 
        />
        {props.errors && props.errors[SIGNUP_FIELDS.streetAddress] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.streetAddress]} />}
      </div>
      <div>
        <TextField
          sx={{width:400}} 
          type="text"
          name={SIGNUP_FIELDS.city} 
          label="City" 
          margin="normal" 
          variant="outlined" 
          color="secondary"
          value={inputs[SIGNUP_FIELDS.city]} 
          onChange={handleChange} 
        />
        {props.errors && props.errors.city && <ErrorComponent title={props.errors.city} />}
      </div>
      <div>
        <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
          <InputLabel>Select province</InputLabel>
          <Select
            labelId="provinceEle"
            name={SIGNUP_FIELDS.province}
            label="Province"
            onChange={handleChange}
          >  
            <MenuItem value={undefined}></MenuItem>
            <MenuItem value={"bc"}>British Columbia</MenuItem>
            <MenuItem value={"ab"}>Alberta</MenuItem>
            <MenuItem value={"sk"}>Saskatchewan</MenuItem>
            <MenuItem value={"mb"}>Manitoba</MenuItem>
            <MenuItem value={"on"}>Ontario</MenuItem>
            <MenuItem value={"qc"}>Quebec</MenuItem>
            <MenuItem value={"nb"}>New Brunswick</MenuItem>
            <MenuItem value={"ns"}>Nova Scotia</MenuItem>
            <MenuItem value={"pe"}>Prince Edward Island</MenuItem>
            <MenuItem value={"nl"}>Newfoundland and Labrador</MenuItem>
            <MenuItem value={"yt"}>Yukon Territory</MenuItem>
            <MenuItem value={"nt"}>Northwest Territories</MenuItem>
            <MenuItem value={"nu"}>Nunavut</MenuItem>
          </Select>
          {props.errors && props.errors[SIGNUP_FIELDS.province] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.province]} />}
          </FormControl>
      </div>
      <div>
        <TextField
          sx={{width:200}} 
          type="text"
          name={SIGNUP_FIELDS.postalCode}
          label="Postal code"
          inputProps={{ maxLength: 6 }}
          margin="normal" 
          variant="outlined" 
          color="secondary"
          value={inputs[SIGNUP_FIELDS.postalCode]}
          onChange={handleChange} 
        />
        {props.errors && props.errors[SIGNUP_FIELDS.postalCode] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.postalCode]} />}
      </div>
      <div>
        <InputMask mask="999-999-9999" onChange={handleChange} value={inputs[SIGNUP_FIELDS.phone]}> 
          <TextField 
            sx={{width:200}}
            type="tel" 
            name={SIGNUP_FIELDS.phone}
            label="Phone number" 
            margin="normal" 
            variant="outlined" 
            color="secondary"
          />
        </InputMask>
        {props.errors && props.errors[SIGNUP_FIELDS.phone] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.phone]} />}
      </div>
    </div>
  )
}
