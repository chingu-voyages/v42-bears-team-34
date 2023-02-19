/**
 * getting and writing the JWT token ("auth-token") to sessionStorage
 */

const KEY = 'auth-token';
export class TokenManager {
  /**
   * @returns {string | null }
   */
  static getToken() {
    return sessionStorage.getItem(KEY);
  }

  /**
   * Simply writes `auth-token` data to sessionStorage
   * @param { string } data
   * @returns { null }
   */
  static writeToken(data) {
    if (data === undefined || data === null)
      console.warn(
        'TokenManager: Writing null or undefined data to auth-token'
      );
    sessionStorage.setItem(KEY, data);
  }

  static clearToken() {
    sessionStorage.clear(KEY, '');
  }

  /**
   * Parses and decodes the payload so we get an auth object
   * We can use this to extract the exp on the token
   * @param {string} token
   * @returns {{ id: string, email: string, firstName: string, lastName: string, exp: number, iat: number, role: "user" | "admin"}}
   */
  static parseToken(token) {
    // Split token by "." get the second element (the payload)
    const payLoad = token.split('.')[1];
    return JSON.parse(TokenManager.#decode(window.atob(payLoad)));
  }

  static #decode(str) {
    const decoder = new TextDecoder('utf-8');
    const arr = new Uint8Array(new ArrayBuffer(str.length));
    for (let i = 0; i < str.length; i++) arr[i] = str.charCodeAt(i);
    const text = decoder.decode(arr);
    return text;
  }
}
