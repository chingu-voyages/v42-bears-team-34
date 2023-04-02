import React, { useRef, useState, useCallback, useContext } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import UserDetailsStep from './step-pages/UserDetailsStep';
import PasswordDateOfBirthStep from './step-pages/PasswordDateOfBirthStep';
import LoanApplicationDetailsStep from './step-pages/LoanApplicationDetailsStep';
import IbvPromptPage from './step-pages/IbvPromptPage';
import PlaidLinkPage from './step-pages/PlaidLinkPage';
import AppContext from '../../context/AppContext';
import { Button, Box, Typography } from '@mui/material';
import { SignupValidator } from '../../utils/validation/validate-signup';
import { SignupDataStore } from '../../services/SignupDataStore/signup-data-store';
import { STEP_STATE } from './steps-state';
import { SignUpHelper } from '../../services/sign-up-helper/sign-up-helper';
import { SIGNUP_FIELDS } from './sign-up-fields';
import { ApplicationClient } from '../../services/api-clients/application-client';
import { APP_ACTIONS } from '../../context/app.actions';
import { TokenManager } from '../../services/token-manager/token-manager';
import AlertModal from '../../components/AlertModal/AlertModal';
import { generateSignupError } from '../../utils/signup-error-generator';
import { useNavigate } from 'react-router-dom';
import { StyledTextLink } from '../../components/StyledTextLink';
import { SummaryFinishPage } from './step-pages/SummaryFinishPage';
import VerificationCodeStep from './step-pages/VerificationCodeStep';
import { PALLET } from '../../stylings/pallet';

const steps = [
  'Create your Account',
  'Verify your E-mail Address',
  'Name & Address Information',
  'Your Loan Information',
  'Your Bank Verification',
];

function showSteps(
  step,
  handleStepDataChange,
  errors,
  state,
  setConfirmationValidationState,
  handleLinkSuccess
) {
  switch (step) {
    case 0:
      return (
        <PasswordDateOfBirthStep
          onStepDataChange={handleStepDataChange}
          errors={errors}
        />
      );
    case 1:
      return (
        <VerificationCodeStep
          onStepDataChange={handleStepDataChange}
          errors={errors}
        />
      );
    case 2:
      return (
        <UserDetailsStep
          onStepDataChange={handleStepDataChange}
          errors={errors}
        />
      );
    case 3:
      return (
        <LoanApplicationDetailsStep
          onStepDataChange={handleStepDataChange}
          errors={errors}
        />
      );
    case 4:
      return (
        <IbvPromptPage
          onStepDataChange={handleStepDataChange}
          submitState={state}
          onInvalidState={setConfirmationValidationState}
        />
      );
    case 5:
      return <PlaidLinkPage onLinkSuccess={handleLinkSuccess} />;
    case 6:
      return <SummaryFinishPage />;
  }
}

// Regular next button
const ConfirmButton = (props) => {
  const { title, onClick, disabled } = props;
  return (
    <Button
      color="inherit"
      variant="contained"
      sx={{ mr: 1 }}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

function SignupPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [, setConfirmationValidationError] = useState(false);
  const { dispatch, pendingApplicationId } = useContext(AppContext);
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const [errors, setErrors] = useState({}); // This refers to errors for individual fields in the application
  const [isConfirmLoggingIn, setIsConfirmLoggingIn] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState({
    title: '',
    bodyText: '',
  });
  const [hasSignupError, setHasSignupError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const stepData = useRef(STEP_STATE[0]);

  const navigate = useNavigate();

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    // Extract form field errors
    const errors = SignupValidator.validate(
      Object.keys(STEP_STATE[activeStep]),
      stepData.current
    );

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});
    storeDataInSession(stepData.current);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const storeDataInSession = (data) => {
    // Data should pass validation before we do this.
    SignupDataStore.putData(data);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepDataChange = (data) => {
    stepData.current = {
      ...stepData.current,
      ...data,
    };
  };

  const handleSignupFlow = useCallback(() => {
    /* Increment the active step, which should hide the back button
      This will attempt to create an account
      Increment the activeStep to show the final step which is the plaid screen.
    */
    const doSignupFlow = async () => {
      try {
        // Disable the confirm button
        setIsConfirmLoggingIn(true);
        /* 
          - This should create an account, log the user in, and get a plaidToken.
          - If an e-mail already exists in our db, attempt to sign-in with the e-mail & password
            supplied in the application.

            If that fails, an error will be caught where we can notify the user that they 
            need to log in to their portal to continue their application.

            If there are password issues at this point, they can do a password recovery
        */

        // What if the user has an existing session

        const linkToken = await SignUpHelper.run({
          firstName: stepData.current[SIGNUP_FIELDS.firstName],
          lastName: stepData.current[SIGNUP_FIELDS.lastName],
          email: stepData.current[SIGNUP_FIELDS.email],
          password: stepData.current[SIGNUP_FIELDS.password1],
          dateOfBirth:
            stepData.current[SIGNUP_FIELDS.dateOfBirth].toISOString(),
          applicantGender: stepData.current[SIGNUP_FIELDS.applicantGender],
          streetAddress: stepData.current[SIGNUP_FIELDS.streetAddress],
          additionalAddress: stepData.current[SIGNUP_FIELDS.additionalAddress],
          unitNumber: stepData.current[SIGNUP_FIELDS.unitNumber],
          city: stepData.current[SIGNUP_FIELDS.city],
          postalCode: stepData.current[SIGNUP_FIELDS.postalCode],
          province: stepData.current[SIGNUP_FIELDS.province],
        });

        // Dispatch the link token to the app state
        dispatch({
          type: APP_ACTIONS.SET_STATE,
          state: {
            linkToken: linkToken,
          },
        });

        // if success, increment the activeStep that will lead us to the plaid process
        // If the user aborts the sign up process at this step, they can re-register, but their
        // email and password need to match what they entered in their first application. If it doesn't match, they will get
        // an error and should be prompted to sign in to the user portal / recover their password (V2)
        // Create a new application.

        // Submit the initial application before the plaid link
        const jwtToken = TokenManager.getToken();
        const applicationClient = new ApplicationClient({
          authToken: jwtToken,
        });
        const responseData = await applicationClient.postNewApplication({
          applicantIncome: stepData.current[SIGNUP_FIELDS.applicantIncome],
          applicantOccupation:
            stepData.current[SIGNUP_FIELDS.applicantOccupation],
          installmentAmount: stepData.current[SIGNUP_FIELDS.installmentAmount],
          loanPurpose: stepData.current[SIGNUP_FIELDS.loanPurpose],
          numberOfInstallments:
            stepData.current[SIGNUP_FIELDS.numberOfInstallments],
          requestedLoanAmount:
            stepData.current[SIGNUP_FIELDS.requestedLoanAmount],
        });
        // Save the newly created applicationID to global state
        dispatch({
          type: APP_ACTIONS.SET_STATE,
          state: {
            pendingApplicationId: responseData.id,
            user: TokenManager.parseToken(jwtToken),
          },
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        // If we get to this block, the sign-up flow catastrophically failed
        // And we should prompt user to login and continue their application
        // under their established credentials or do a password recovery
        console.log(error);
        // Determine the type of error and if we should show a special modal
        setHasSignupError(true);
        generateSignupError(error, setModalOpen, setSignupErrorMessage);
      }
    };
    doSignupFlow();
  }, []);

  const handleLinkSuccess = async (itemId) => {
    try {
      // Trigger the server to send a welcome e-mail, send the e-mail and the itemId to the server
      const applicationClient = new ApplicationClient();
      await applicationClient.triggerWelcomeEmail({
        itemId: itemId,
        email: stepData.current[SIGNUP_FIELDS.email],
        applicationId: pendingApplicationId,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

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
      <Box component={'div'} display={'flex'} justifyContent={'center'} mt={3}>
        <Box ml={2} mr={2} component={'form'} id="questionnaire">
          {showSteps(
            activeStep,
            handleStepDataChange,
            errors,
            stepData.current,
            setConfirmationValidationError,
            handleLinkSuccess
          )}
        </Box>
      </Box>
      {activeStep === steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
        </Box>
      ) : (
        <Box
          display={'flex'}
          flexDirection={'row'}
          pt={2}
          justifyContent={'center'}
        >
          {activeStep < 6 && (
            <>
              {activeStep < STEP_STATE.length && (
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
              )}
              {activeStep < STEP_STATE.length && (
                <Button onClick={handleNext} variant="contained">
                  Next
                </Button>
              )}
              {activeStep === STEP_STATE.length && (
                <ConfirmButton
                  title={'Confirm'}
                  onClick={handleSignupFlow}
                  disabled={isConfirmLoggingIn}
                />
              )}
            </>
          )}
        </Box>
      )}
      <AlertModal
        open={modalOpen}
        onDismiss={() => setModalOpen(false)}
        title={signupErrorMessage.title}
        bodyText={signupErrorMessage.bodyText}
      />
      {hasSignupError && (
        <>
          <Box mt={3}>
            <Typography
              textAlign={'center'}
              sx={{ color: PALLET.hemoglobinErrorRed }}
            >
              There was an error and we are unable to continue.
            </Typography>
          </Box>
          <Box display="flex" justifyContent={'center'} mt={3}>
            <StyledTextLink
              url={'/user/applications'}
              text={'Sign in to your account'}
              navigate={navigate}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default SignupPage;
