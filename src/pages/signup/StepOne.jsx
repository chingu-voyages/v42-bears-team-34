import React from "react";
import { TextField, Button } from "@mui/material";

export default function StepOne() {
  return (
    <div>
        <div>
            <TextField 
                sx={{width:400}}
                type="text" 
                label="First name" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text" 
                label="Last name" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="text" 
                label="Address" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text" 
                label="City" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text" 
                label="Province" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField
                sx={{width:400}} 
                type="text" 
                label="Postal code" 
                margin="normal" 
                variant="outlined" 
                color="secondary" />
        </div>
        <div>
            <TextField 
                sx={{width:400}}
                type="number" 
                label="Phone number" 
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
