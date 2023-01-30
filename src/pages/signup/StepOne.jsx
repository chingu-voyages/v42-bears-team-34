import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import ValidateSignup from "./ValidateSignup";

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
                name="firstName"
                label="First name" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                value={inputs.firstName} 
                onChange={handleChange} />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
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
                {errors.lastName && <p className="error">{errors.lastName}</p>}
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
                {errors.address && <p className="error">{errors.address}</p>}
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
                {errors.city && <p className="error">{errors.city}</p>}
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
                {errors.province && <p className="error">{errors.province}</p>}
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
                {errors.postalCode && <p className="error">{errors.postalCode}</p>}
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
                {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
    </div>
  )
}
