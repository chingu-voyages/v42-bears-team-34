import axios from "axios";
import { ENV } from "../../environment";

/* 
This is the base client (abstract) class used to communicate with our API. 
We should create specialized clients that derive from this class
instead of using it directly.
*/
export class BaseClient {
  #api;

  constructor(headers) {
    this.api = axios.create({
      baseURL: ENV.API_URL,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        ...headers,
      },
    });
  }
  /**
   * 
   * @param {string} url
   * @returns 
   */
  async getData(url) {
    const response = await this.api.get(url);
    return response.data;
  }

  /**
   * 
   * @param {string} url 
   * @param {*} data 
   * @returns 
   */
  async postData(url, data) {
    const response = await this.api.post(url, data);
    return response.data;
  }

  /**
   * 
   * @param {string} url 
   * @param {*} data 
   * @returns 
   */
  async patchData(url, data) {
    const response = await this.api.patch(url, data);
    return response.data;
  }

  /**
   * 
   * @param {string} url 
   * @param {*} data 
   * @returns 
   */
  async putData(url, data) {
    const response = await this.api.put(url, data);
    return response.data;
  }

  /**
   * 
   * @param {string} url 
   * @param {*} data 
   * @returns 
   */
  async deleteData(url, data) {
    const response = await this.api.delete(url, { data: data });
    return response.data;
  }
}
