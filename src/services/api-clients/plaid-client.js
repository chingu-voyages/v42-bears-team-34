import { BaseClient } from "./base-client";

/**
 * This client gets the link token we need to
 * open up link. This requires the user to be authenticated
 * with a JWT from our API
 */
export class PlaidClient extends BaseClient {
  constructor({ authToken }) {
    super({
      "Authorization": `Bearer ${authToken}`,
    });
  }

  /**
   * Send request to our API for the link token
   * @param {string} authenticationToken
   * @returns {Promise<{ expiration: ISODateString, link_token: string, request_id: string}>}
   */
  async getLinkToken () {
    return super.getData("/plaid/get_token");
  }

  /**
   * Send request for public token to be exchanged
   * @returns {Promise<{itemId: string}>}
   */
  async postSetPublicToken (token) {
    return super.postData("/plaid/set_public_token", { publicToken: token });
  }

  /**
   * This is only used in the sign-up process. Once the Link widget stuff is successful,
   * we'll call this method to make our API fetch the financial data from plaid and store it in the database.
   * No data is returned from this request! The only thing returned is an HTTP response (200).
   * If we want to fetch the user's application and personal data from our DB, we'll use a separate client (UserClient)
   * to make that request.
   * @returns {HTTPResponse} An HTTP response / object
   */
  async postRequestAPIFetchPlaidData () {
    return super.postData("/plaid/get_financial_details");
  }
}
