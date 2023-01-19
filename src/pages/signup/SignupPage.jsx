import React from 'react'
// import { Stepper, Step, StepLabel, Typography, Button } from "@mui/material-ui/core";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

const steps = [
  "Your personal information",
  "Create your password",
  "Your Loan information",
  "Your bank verification"
];

const SignupPage = () => {

  function showSteps(step) {
    switch(step) {
      case 1 :
        return <StepOne />
      case 2 :
        return <StepTwo />
      case 3 :
        return <StepThree />
      case 4 :
        return <StepFour />
    }
  }

  return (
    <div className="form-signup">
      <Stepper 
        activeStep={1} 
        horientation="horizontal"
        sx={{width:700, margin: "auto"}}
        >
          
        {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
        ))}
      </Stepper>

      <StepOne />
      <StepTwo />
      <StepThree />
      <StepFour />

      {showSteps()}
    </div>
  )
}

export default SignupPage;