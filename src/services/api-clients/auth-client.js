import { BaseClient } from './base-client';
/* 
  Handles log in, log out, account registration
*/
export class AuthClient extends BaseClient {
  constructor(headers) {
    super(headers);
  }

  /**
   * Creates a user account
   * @param {{ firstName: string, lastName: string, email: string, password: string, dateOfBirth: ISODateString, applicantGender: string, streetAddress: string,
   * city: string, unitNumber: string, additionalAddress: string, postalCode: string, province: string }}
   * @returns {Promise<void>}
   */
  async createUserAccount({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    applicantGender,
    streetAddress,
    city,
    unitNumber,
    additionalAddress,
    postalCode,
    province,
  }) {
    return super.postData('/auth/signup', {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      applicantGender,
      streetAddress,
      city,
      unitNumber,
      additionalAddress,
      postalCode,
      province,
    });
  }

  /**
   * Logs user in. Should get back a JWT Token to store in session
   * If the isAdmin flag is set to true, the backend will check for admin role on the account
   * @param {{ email: string, password: string, isAdmin: null | boolean }}
   * @returns {Promise<{ tok: string }>} JWT Token as a string
   */
  async login({ email, password, isAdmin }) {
    return super.postData('/auth/login', { email, password, isAdmin });
  }

  /**
   * This returns the profile of the requesting authenticated user. They need to have a JWT in session
   * @returns {Promise<{ tok: string }>}
   */
  async refreshToken() {
    return super.postData('/auth/refresh');
  }

  /**
   * Sends the request to send a password reset e-mail
   * @param {{ email: string}} param0
   */
  async sendPasswordRecoveryRequestAuthorization({ email }) {
    return super.postData('/auth/password-recovery/request', { email });
  }

  /**
   * Complete the change password process
   * @param {{ token: string, password: string }} param0
   */
  async submitPasswordRecoveryNewPassword({ token, password }) {
    return super.postData('/auth/password-recovery/update-password', {
      token,
      password,
    });
  }

  /**
   *
   * @param {string} email
   * @param {boolean} resend
   */
  async triggerVerificationCodeEmail(email) {
    return super.postData('/auth/verification-code-email', { email: email });
  }

  /**
   *
   * @param {string} email
   * @returns {Promise<{ value: boolean}>}
   */
  async getIsEmailVerified(email) {
    return super.getData(`/auth/isEmailVerified/${email}`);
  }

  /**
   *
   * @param {string} email
   * @param {string} code
   * @returns {Promise<{ result: boolean, msg: string}>} the result of the operation
   */
  async verifyEmail(email, code) {
    return super.postData('/auth/email/verify', { email: email, code: code });
  }
}
