import { BaseUserActionClient } from "./base-user-action-client";

/**
 * This class should handle communication to our backend
 * for users that have a JWT
 */
export class UserClient extends BaseUserActionClient {
  constructor({ authToken }) {
    super(
      {
        "Authorization": `Bearer ${authToken}`,
      }
    )
  }
   /**
   * This returns the profile of the requesting authenticated user. They need to have a JWT in session
   * @returns {Promise<{ id: string, firstName: string, lastName: string, email: string, role: "user" | "admin", iat: number, exp: number, expired?: boolean }>}
   */
   async getUserProfile() {
    return super.getData("/auth/profile")
  }
}
