import React, { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import ValidateSignup from "./ValidateSignup";

export default function StepTwo(props) {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

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
                type="email"
                name="email" 
                label="Email" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                value={inputs.email}
                onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="password"
                name="password" 
                label="Password" 
                margin="normal" 
                variant="outlined" 
                color="secondary"
                value={inputs.password}
                onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="password" 
                name="confirmPassword"
                label="Confirm password" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                value={inputs.confirmPassword} 
                onChange={handleChange} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
    </div>
  )
}
