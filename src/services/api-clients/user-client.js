import { BaseUserActionClient } from './base-user-action-client';

/**
 * This class should handle communication to our backend
 * for users that have a JWT
 */
export class UserClient extends BaseUserActionClient {
  constructor({ authToken }) {
    super({
      Authorization: `Bearer ${authToken}`,
    });
  }
  /**
   * This returns the profile of the requesting authenticated user. They need to have a JWT in session
   * @returns {Promise<{ id: string, firstName: string, lastName: string, email: string, role: "user" | "admin", iat: number, exp: number, expired?: boolean }>}
   */
  async getUserProfile() {
    return super.getData('/auth/profile');
  }

  /**
   * User to get his own applications.
   * @returns {Promise<{ id: string,
   *  requestedLoanAmount: number,
   *  numberOfInstallments: number,
   *  installmentAmount   : number,
   *  loanPurpose         : string,
   *  status              : string,
   *  requestedBy         : string,
   * rejectedReason: string
   * }[]> }
   */
  async getApplications() {
    return super.getData('/application/my');
  }

  /**
   *
   * @param {string} id UserId
   * @returns {Promise<{
   * id: string,
   * firstName: string,
   * lastName: string,
   * dateOfBirth: string,
   * applicantGender: string,
   * email: string,
   * address: { streetAddress: string, unitNumber: string, additionalAddress: string, city: string, postalCode: string, province: string }
   * plaid: boolean
   *
   * }>}
   */
  async getUserById(id) {
    return super.getData(`/auth/user/${id}`);
  }

  /**
   *
   * @param {string} id applicationId
   * @returns {Promise<{
   * requestedLoanAmount: number,
   *  numberOfInstallments: number,
   *  installmentAmount: number,
   *  loanPurpose: string,
   *  status: string,
   *  requestedAt: string,
   *  requestedBy: string,
   *  rejectedReason: string
   * }>} an application document
   */
  async getApplicationById(id) {
    return super.getData(`/application/view/${id}`);
  }

  /**
   *
   * @param {string} id the userId
   * @param {{ firstName: string, lastName: string, applicantGender: string, streetAddress: string, unitNumber: string, additionalAddress: string, dateOfBirth: string, city: string, province: string, postalCode: string}} data
   * @returns
   */
  async patchUserDetails(id, data) {
    console.log(data);
    return super.patchData(`/auth/user/${id}`, data);
  }
}
