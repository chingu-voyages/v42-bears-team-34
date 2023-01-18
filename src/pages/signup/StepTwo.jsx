import React from "react";
import { TextField, Button } from "@mui/material";

export default function StepTwo() {
  return (
    <div> 
        <div>
            <TextField 
                sx={{width:400}}
                type="email" 
                label="Email" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="password" 
                label="Password" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="password" 
                label="Confirm password" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <Button 
                variant="contained" 
                color="primary">Next
            </Button>
        </div>
    </div>
  )
}
