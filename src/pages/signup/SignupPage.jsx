import React, { useRef, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import ValidateSignup from './ValidateSignup';

const steps = [
  "Your personal information", 
  "Create your password", 
  "Your Loan information", 
  "Your bank verification"
];

function showSteps(step, handleStepDataChange ) {
      switch(step) {
        case 0:
          // Retrieve the state from Step one (all of the inputs, etc)
          // onStepDataChange refers to the function that gets called when
          // an input in StepOne changes
          // handleStepDataChange is the function that gets called by the parent
          // component (SignupPage)
          return <StepOne onStepDataChange={handleStepDataChange} />
        case 1:
          return <StepTwo onStepDataChange={handleStepDataChange} />
        case 2:
          return <StepThree onStepDataChange={handleStepDataChange} />
        case 3:
          return <StepFour />
      }
}

function SignupPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const [errors, setErrors] = useState({});
  const stepData = useRef({});

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    // telling the validate function what the current step is
    // and what the current input is, represented by: stepData.current
    ValidateSignup(stepData.current, activeStep)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepDataChange = (data) => {
    console.log("data", data);
    stepData.current = {
      ...stepData.current,
      data,
    }
    console.log("72 StepDataCurrent", stepData.current)
  }

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {showSteps(activeStep, handleStepDataChange )}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 1 ? 'Next' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default SignupPage;