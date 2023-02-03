import React, { useState, useEffect } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SIGNUP_FIELDS } from "./sign-up-fields";

export default function StepOne(props) {
  const [inputs, setInputs] = useState({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      phone: ""
  })

  const [errors, setErrors] = useState({});

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
          value={inputs.firstName} 
          onChange={handleChange} 
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
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
          value={inputs.lastName}
          onChange={handleChange} 
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>
      <div>
        <TextField 
          sx={{width:400}}
          type="text"
          name={SIGNUP_FIELDS.streetAddress}
          label="Address" 
          margin="normal" 
          variant="outlined" 
          color="secondary"
          value={inputs.address} 
          onChange={handleChange} 
        />
        {errors.address && <p className="error">{errors.address}</p>}
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
          value={inputs.city} 
          onChange={handleChange} 
        />
        {errors.city && <p className="error">{errors.city}</p>}
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
          {errors.province && <p className="error">{errors.province}</p>}
          </FormControl>
      </div>
      <div>
        <TextField
          sx={{width:400}} 
          type="text"
          name={SIGNUP_FIELDS.postalCode}
          label="Postal code" 
          margin="normal" 
          variant="outlined" 
          color="secondary"
          value={inputs.postalCode}
          onChange={handleChange} 
        />
        {errors.postalCode && <p className="error">{errors.postalCode}</p>}
      </div>
      <div>
        <TextField 
          sx={{width:400}}
          type="number" 
          name={SIGNUP_FIELDS.phone}
          label="Phone number" 
          margin="normal" 
          variant="outlined" 
          color="secondary"
          value={inputs.phone} 
          onChange={handleChange} 
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
    </div>
  )
}
