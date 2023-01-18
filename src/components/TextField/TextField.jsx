import React from 'react'
import { TextField } from '@mui/material';

function CustomTextField(props) {

//    const handleInputsChanged = (e) => {
//         if(e.id) {

//         }
//    }
 
  return (
    <div>
        <TextField 
            id={props.id}
            name={props.name}
            type={props.type}
            label={props.label}
            // placeholder="example@example.com"
            onChange={handleInputsChanged}
            // helperText="Please enter a valid e-mail address"
            // required
            // error={hasEmailError}
            // fullWidth    
        />
    </div>
  )
}

export default TextField