import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { Button } from '@mui/material';
import { useState } from 'react';


const SignupPage = () => {

  const [activeStep, setActiveStep] = useState(1);

  function getSteps() {
    return [
      "Your personal information", 
      "Create your password", 
      "Your Loan information", 
      "Your bank verification"
    ];
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const steps = getSteps();

  function showSteps(step) {
    switch(step) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      case 4:
        return <StepFour />
    }
  }

  return (
    <div className="form-signup">
      <Stepper 
        activeStep={activeStep} 
        horientation="horizontal"
        alternativeLabel
        sx={{width:700, margin: "auto"}}
        >
          
        {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
        ))}
      </Stepper>

     <>
        {activeStep === steps.length ? "Submit" : (
          <>
          {showSteps(activeStep)}
            <Button onClick={handleNext}>
              {activeStep === steps.length ? "Finish" : "Next"} 
            </Button>
          </> 
        )}
      </>
    </div>
  )
}

export default SignupPage;