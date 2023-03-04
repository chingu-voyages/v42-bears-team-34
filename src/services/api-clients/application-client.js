/**
 * This is used in sign-up to send the new application data to our DB
 * Creates a new application. User must be authenticated to use this client
 */

import { BaseClient } from './base-client';

export class ApplicationClient extends BaseClient {
  constructor({ authToken }) {
    super({
      Authorization: `Bearer ${authToken}`,
    });
  }

  /**
   * POST request creates a new application on our DB and sends the data
   * Should return the id of the newly created application
   *
   * @param {{ }} data
   * @returns {Promise<{ message: string, id: string }>}
   */
  async postNewApplication(data) {
    return super.postData('/application/apply', data); // This needs to be updated to the proper route
  }

  /**
   *
   * @param {{ applicantIncome: number, requestedLoanAmount: number, applicantOccupation: string, installmentAmount: number, numberOfInstallments: number, loanPurpose: string }} data
   */
  async patchExistingApplication(id, data) {
    return super.patchData(`/application/update/${id}`, data);
  }
}
