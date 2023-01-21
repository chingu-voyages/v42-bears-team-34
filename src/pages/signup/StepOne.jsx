import React from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

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

    const handleChange = (e) => {
        e.preventDefault();
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

  return (
    <div>
        <div>
            <TextField 
                sx={{width:400}}
                type="text" 
                name="firstName"
                label="First name" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                value={inputs.firstName} 
                onChange={handleChange} />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text" 
                name="lastName"
                label="Last name" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                value={inputs.lastName}
                onChange={handleChange} />
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="text"
                name="address" 
                label="Address" 
                margin="normal" 
                variant="outlined" 
                color="secondary"
                value={inputs.address} 
                onChange={handleChange} />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text"
                name="city" 
                label="City" 
                margin="normal" 
                variant="outlined" 
                color="secondary"
                value={inputs.city} 
                onChange={handleChange} />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text" 
                name="province"
                label="Province" 
                margin="normal" 
                variant="outlined" 
                color="secondary"
                value={inputs.province} 
                onChange={handleChange} />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text"
                name="postalCode" 
                label="Postal code" 
                margin="normal" 
                variant="outlined" 
                color="secondary"
                value={inputs.postalCode}
                onChange={handleChange} />
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="number" 
                name="phone"
                label="Phone number" 
                margin="normal" 
                variant="outlined" 
                color="secondary"
                value={inputs.phone} 
                onChange={handleChange} />
        </div>
    </div>
  )
}
