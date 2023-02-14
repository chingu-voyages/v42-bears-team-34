import { BaseUserActionClient } from "./base-user-action-client";

/**
 * This class should handle communication to our backend
 * for users that have a JWT
 */
export class AdminClient extends BaseUserActionClient {
  constructor({ authToken }) {
    super(
      {
        "Authorization": `Bearer ${authToken}`,
      }
    )
  }
 
  async adminGetAllApplications() {
    return super.getData("/admin/application/all");
  }

   /**
   * @param {string} id 
   * @returns {Promise<{ 
   * id: string,
   * applicantGender: string,
   * email: string,
   * dateOfBirth: string,
   * firstName: string,
   * lastName: string,
   * address: { streetAddress: string, unitNumber: string, city: string, additionalAddress: string, postalCode: string, province: string }}}
   */
  async adminGetUserById(id) {
    return super.getData(`/auth/user/${id}`)
  }

  /**
   * 
   * @param {string} id applicationId 
   * @returns {Promise<{ 
   * requestedLoanAmount: number,
    *  numberOfInstallments: number,
    *  installmentAmount: number,
    *  loanPurpose: string
    *  status: string
    *  requestedAt: string
    *  requestedBy: string
    * rejectedReason: string
   * }>} an application document
   */
  async adminGetApplicationById(id) {
    return super.getData(`/application/view/${id}`)
  }

  /**
   * Gets financial liabilities from Plaid via our API
   * @param {string} id userID
   */
  async getFinancialLiabilitiesByUserID (id) {
    return super.getData(`/plaid/financial_details/${id}?category=liabilities`);
  }
}
  
