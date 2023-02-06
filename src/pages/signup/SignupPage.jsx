import React, { useRef, useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import PlaidConfirm from './PlaidConfirm';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { SignupValidator } from './validate-signup';
import { SignupDataStore } from '../../services/SignupDataStore/signup-data-store';
import { STEP_STATE } from './steps-state';

const steps = [
  "Your personal information", 
  "Create your password", 
  "Your Loan information", 
  "Your bank verification"
];

function showSteps(step, handleStepDataChange, errors, state, setConfirmationValidationState ) {
  switch(step) {
    case 0:
      return <StepOne onStepDataChange={handleStepDataChange} errors={errors}/>
    case 1:
      return <StepTwo onStepDataChange={handleStepDataChange} errors={errors}/>
    case 2:
      return <StepThree onStepDataChange={handleStepDataChange} errors={errors} />
    case 3:
      return <StepFour onStepDataChange={handleStepDataChange} submitState={state} onInvalidState={setConfirmationValidationState} />
    case 4:
      return <PlaidConfirm />
  }
}

function SignupPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [confirmationValidationError, setConfirmationValidationError] = useState(false);
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const [errors, setErrors] = useState({});
  const stepData = useRef(STEP_STATE[0]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    // Extract errors
    const errors = SignupValidator.validate(Object.keys(STEP_STATE[activeStep]), stepData.current);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    storeDataInSession(stepData.current)
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const storeDataInSession = (data) => {
    // Data should pass validation before we do this.
    SignupDataStore.putData(data)
  }

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
          {showSteps(
            activeStep, 
            handleStepDataChange, 
            errors, 
            stepData.current, 
            setConfirmationValidationError 
          )}
        </Box>
      </Box>
      {activeStep === steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
        </Box>
      ) : (
        <Box display={"flex"} flexDirection={"row"} pt={2} justifyContent={"center"}>
        { activeStep < 4 && (
          <>
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
          </>
          )}
        </Box>
      )}
    </Box>
  );
}

export default SignupPage;
