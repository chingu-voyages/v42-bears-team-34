import { BaseClient } from "./base-client";
/* 
  Handles log in, log out, account registration
*/
export class AuthClient extends BaseClient {
  constructor () {
    super();
  }

  /**
   * Creates a user account
   * @param {{ firstName: string, lastName: string, email: string, password: string, dateOfBirth: ISODateString }}
   * @returns {Promise<void>}
   */
  async createUserAccount ({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth
  }) {
    return super.postData("/auth/signup", { firstName, lastName, email, password, dateOfBirth })
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
}
