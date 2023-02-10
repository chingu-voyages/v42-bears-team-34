import { BaseClient } from "./base-client";
/* 
  Handles log in, log out, account registration
*/
export class AuthClient extends BaseClient {
  constructor (headers) {
    super(headers);
  }

  /**
   * Creates a user account
   * @param {{ firstName: string, lastName: string, email: string, password: string, dateOfBirth: ISODateString, applicantGender: string }}
   * @returns {Promise<void>}
   */
  async createUserAccount ({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    applicantGender
  }) {
    return super.postData("/auth/signup", { firstName, lastName, email, password, dateOfBirth, applicantGender })
  }

  /**
   * Logs user in. Should get back a JWT Token to store in session
   * If the isAdmin flag is set to true, the backend will check for admin role on the account
   * @param {{ email: string, password: string, isAdmin: null | boolean }}
   * @returns {Promise<{ tok: string }>} JWT Token as a string
   */
  async login({
    email,
    password,
    isAdmin
  }) {
    return super.postData("/auth/login", { email, password, isAdmin })
  }

  /**
   * This returns the profile of the requesting authenticated user. They need to have a JWT in session
   * @returns {Promise<{ tok: string }>}
   */
  async refreshToken() {
    return super.postData("/auth/refresh")
  }
}
