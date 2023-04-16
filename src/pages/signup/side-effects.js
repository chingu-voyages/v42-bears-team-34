import { STEP_STATE_ID } from './steps-state';
import { SIGNUP_FIELDS } from './sign-up-fields';
import { AuthClient } from '../../services/api-clients/auth-client';
import { APP_ACTIONS } from '../../context/app.actions';
export const signUpSideEffects = {
  [STEP_STATE_ID.EmailPassword]: async (data, otherData) => {
    const { dispatchFunction } = otherData;
    try {
      const email = data[SIGNUP_FIELDS.email];
      const authClient = new AuthClient();
      // Check if email is validated
      const isEmailValidated = await authClient.getIsEmailVerified(email);
      if (isEmailValidated.value === false) {
        await authClient.triggerVerificationCodeEmail(email);
      } else {
        dispatchFunction &&
          dispatchFunction({
            type: APP_ACTIONS.SET_STATE,
            state: {
              emailVerified: true,
            },
          });
      }
    } catch (err) {
      console.error(err);
    }
  },
  [STEP_STATE_ID.VerificationCode]: async (data, otherData) => {
    // Check if e-mail is verified
    const { dispatchFunction } = otherData;
    try {
      const email = data[SIGNUP_FIELDS.email];
      const authClient = new AuthClient();
      // Check if email is validated
      const isEmailValidated = await authClient.getIsEmailVerified(email);
      if (isEmailValidated.value === true) {
        // Change the state to indicate that the e-mail is verified
        dispatchFunction &&
          dispatchFunction({
            type: APP_ACTIONS.SET_STATE,
            state: {
              emailVerified: true,
            },
          });
        return;
      }

      // if e-mail is not verified, attempt to do so.
      // Get the code
      const code = data[SIGNUP_FIELDS.verificationCode];
      const verificationResult = await authClient.verifyEmail(email, code);
      if (verificationResult.result === true) {
        // Update the state
        dispatchFunction &&
          dispatchFunction({
            type: APP_ACTIONS.SET_STATE,
            state: {
              emailVerified: true,
            },
          });
      }
    } catch (err) {
      console.error(err);
    }
  },
};
