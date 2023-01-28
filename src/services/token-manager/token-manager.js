/**
 * getting and writing the JWT token ("auth-token") to sessionStorage
 */

const KEY = "auth-token"
export class TokenManager {
  /**
   * @returns {string | null }
   */
  static getToken () {
    return sessionStorage.getItem(KEY)
  }

  /**
   * Simply writes `auth-token` data to sessionStorage
   * @param { string } data 
   * @returns { null }
   */
  static writeToken (data) {
    if (data === undefined || data === null) console.warn("TokenManager: Writing null or undefined data to auth-token")
    sessionStorage.setItem(KEY, data)
  }
}
