/**
 * This class does the sign-up flow to get to the plaid integration
 * since there needs to be an authentication session
 * This should be used during sign-up / questionnaire
 * This should result in a link Token after running the `run` method
 */

import { AuthClient } from "../api-clients/auth-client"
import { PlaidClient } from "../api-clients/plaid-client";
import { TokenManager } from "../token-manager/token-manager";

const SIGNUP_FLOW_RESULT_STATUS = {
  success: "$REGISTER_SUCCESS",
  emailExists: "$EMAIL_EXISTS",
}

// TODO: How much data from the application before plaid should we send over?
export class SignUpHelper {
  /**
   * Streamline the signup, login, plaidToken workflow. Errors thrown will bubble up.
   * @param {{ firstName: string, lastName: string, dateOfBirth: string, email: string, password: string, applicantGender: string }} fields
   * @returns {Promise<string>} should return a link token
   */
  static async run (fields) {
    const { firstName, lastName, email, password, dateOfBirth, applicantGender } = fields;
    // Attempt to register a new account. This will return a string response indicating the result of the request.
    const registrationResult = await SignUpHelper
      .#attemptToRegister({ firstName, lastName, email, password, dateOfBirth, applicantGender });

    if (registrationResult === SIGNUP_FLOW_RESULT_STATUS.success || registrationResult === SIGNUP_FLOW_RESULT_STATUS.emailExists) {
      // This could potentially throw an error
      return SignUpHelper.#LoginAndGetLinkToken({ email, password });
    } else {
      throw new Error(`$FAIL Signup flow failed ${registrationResult}`)
    }
  }
  
  static async #logIn({ email, password}) {
    const authClient = new AuthClient();
    return authClient.login({ email, password })
  }

  /**
   * Invoke this method when the registration is successful in the flow
   * We should login and get a link token from this method. Errors should bubble up
   * @param {{ email: string, password: string}} param0
   * @returns {Promise<string>} linkToken
   */
  static async #LoginAndGetLinkToken({ email, password }) {
    const jwtTokenData = await SignUpHelper.#logIn({ email, password });
    if (jwtTokenData && jwtTokenData.tok) {
      TokenManager.writeToken(jwtTokenData.tok); // Write the auth token to session storage
      const linkToken = await SignUpHelper.#getLinkToken({ authToken: jwtTokenData.tok })
      return linkToken.link_token;
    } else {
      throw new Error(`SignUpHelper: jwt token error`)
    }
  }

  static async #getLinkToken({ authToken}) {
     // We should have a JWT at this stage (aka, be authenticated). Request a link token
     const plaidClient = new PlaidClient({ authToken });
     return plaidClient.getLinkToken();
  }

  /**
   * Attempt to create a new user. This swallows errors. If this is a success it will return
   * the success string. If it errors out, return the error message. If it's the case that the e-mail
   * already exists, return a string indicating so.
   * @param {{ firstName: string, lastName: string, password: string, dateOfBirth: string, applicantGender: "male" | "female" | "other"}} param0 
   * @returns {Promise<string>}
   */
  static async #attemptToRegister({ email, firstName, lastName, password, dateOfBirth, applicantGender }) {
    // Attempt to signup
    console.log("75 Attempt to signup applicantGender", applicantGender)
    try {
      const authClient = new AuthClient();
      await authClient
        .createUserAccount({ 
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
          applicantGender
        });
      return SIGNUP_FLOW_RESULT_STATUS.success;
    } catch (error) {
      if (error.response?.status === 400) {
        if (error.response?.data?.msg?.startsWith(SIGNUP_FLOW_RESULT_STATUS.emailExists)) {
          return SIGNUP_FLOW_RESULT_STATUS.emailExists;
        }
      }
      return error.message;
    }
  }
}
