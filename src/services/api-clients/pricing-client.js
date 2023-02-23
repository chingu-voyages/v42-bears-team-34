import { BaseClient } from "./base-client";

// This client just gets random pricing stuff to help us determine loan eligibility
export class PricingClient extends BaseClient {
  /**
   * 
   * @param {number} loanAmount 
   * @returns {Promise<{ [key in "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"]: number }>}
   */
  async getPaymentInstallmentsByLoanAmount(loanAmount) {
    return super.getData(`/application/payment_size?requestedLoanAmount=${loanAmount}`)
  }
}
