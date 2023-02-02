import { TokenManager } from "../token-manager/token-manager";
import { AuthClient } from "./auth-client";
import { BaseClient } from "./base-client";

/**
 * This class covers when a user takes an action on our API outside of authentication
 */
export class BaseUserActionClient extends BaseClient {
  #authClient
  constructor(headers) {
    super(
      headers
    )
    this.#authClient = new AuthClient(
      headers
    )
  }

  /**
   * 
   * @returns 
   */
  async checkPreAuthorization () {
    const responseData = await this.#authClient.refreshToken()
    TokenManager.writeToken(responseData.tok);
  }
  /**
   * @param {string} url 
   * @returns {Promise<any>}
   */
  async getData(url) {
    await this.checkPreAuthorization();
    return super.getData(url)
  }

  /**
   * @param {string} url 
   * @returns {Promise<any>}
   */
  async putData(url, data) {
    await this.checkPreAuthorization();
    return super.putData(url, data);
  }

   /**
   * @param {string} url 
   * @returns {Promise<any>}
   */
   async patchData(url, data) {
    await this.checkPreAuthorization();
    return super.patchData(url, data);
  }


  /**
   * 
   * @param {string} url 
   * @returns {Promise<any>}
   */
  async postData(url, data) {
    await this.checkPreAuthorization();
    return super.postData(url, data);
  }

  /**
   * 
   * @param {string} url 
   * @returns {Promise<any>}
   */
  async deleteData(url, data) {
    await this.checkPreAuthorization();
    return super.deleteData(url, data);
  }
}
