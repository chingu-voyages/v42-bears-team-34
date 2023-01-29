/**
 * This class does the sign-up flow to get to the plaid integration
 * since there needs to be an authentication session
 * This should be used during sign-up / questionnaire
 * This should result in a link Token after running the `run` method
 */

import { AuthClient } from "../api-clients/auth-client"
import { PlaidClient } from "../api-clients/plaid-client";
import { TokenManager } from "../token-manager/token-manager";

export class SignUpFlow {
  /**
   * @param {{ email: string, password: string }}
   * @returns {Promise<string>} should return a link token
   */
  static async run ({ email, password }) {
    const jwtTokenData = await SignUpFlow.#logIn({ email, password });
    if (jwtTokenData) {
      // Write the token data to local storage
      TokenManager.writeToken(jwtTokenData.tok);
    } else {
      throw new Error(`SignUpFlow: jwt token error`)
    }

    const linkToken = await SignUpFlow.#getLinkToken({ authToken: jwtTokenData.tok })
    return linkToken.link_token;
  }
  
  static async #logIn({ email, password}) {
    const authClient = new AuthClient();
    return authClient.login({ email, password })
  }

  static async #getLinkToken({ authToken}) {
     // We should have a JWT at this stage (aka, be authenticated). Request a link token
     const plaidClient = new PlaidClient({ authToken });
     return plaidClient.getLinkToken();
  }
}
