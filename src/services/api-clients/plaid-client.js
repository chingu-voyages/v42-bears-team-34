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
}
