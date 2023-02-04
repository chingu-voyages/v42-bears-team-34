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
import { validateSignup } from './validate-signup';

const steps = [
  "Your personal information", 
  "Create your password", 
  "Your Loan information", 
  "Your bank verification"
];

function showSteps(step, handleStepDataChange, errors) {
  switch(step) {
    case 0:
      return <StepOne onStepDataChange={handleStepDataChange} errors={errors}/>
    case 1:
      return <StepTwo onStepDataChange={handleStepDataChange} errors={errors}/>
    case 2:
      return <StepThree onStepDataChange={handleStepDataChange} errors={errors} />
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

    // If there are errors, don't allow the user to go to the next step
    const errors = validateSignup(stepData.current, activeStep)
    if (Object.keys(errors).length > 0) {
      console.log("errors?", errors)
      setErrors(errors)
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepDataChange = (data) => {
    stepData.current = {
      ...stepData.current,
      ...data,
    }
  }

  return (
    <Box>
      <Box mt={2}>
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
      </Box>
      <Box component={"div"} display={"flex"} justifyContent={"center"}>
        <Box ml={2} mr={2} component={"form"} id="questionnaire">
          {showSteps(activeStep, handleStepDataChange, errors )}
        </Box>
      </Box>
      {activeStep === steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"row"} pt={2} justifyContent={"center"}>
          <Button
            color="inherit"
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button onClick={handleNext} variant="contained">
            {activeStep === steps.length - 1 ? 'Next' : 'Next'}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default SignupPage;
