import { BaseClient } from './base-client';

/**
 * This client only handles Plaid Link stuff related to sign-up.
 * It also contains a method to trigger our API to gather financial data on the applicant
 */
export class PlaidClient extends BaseClient {
  constructor({ authToken }) {
    super({
      Authorization: `Bearer ${authToken}`,
    });
  }

  /**
   * Send request to our API for the link token
   * @param {string} authenticationToken
   * @returns {Promise<{ expiration: ISODateString, link_token: string, request_id: string}>}
   */
  async getLinkToken() {
    return super.getData('/plaid/get_token');
  }

  /**
   * Send request for public token to be exchanged
   * @returns {Promise<{itemId: string}>}
   */
  async postSetPublicToken(token) {
    return super.postData('/plaid/set_public_token', { publicToken: token });
  }
}
