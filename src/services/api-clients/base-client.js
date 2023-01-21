import axios from "axios";
import { ENV } from "../../environment";

/* 
This is the base class used to communicate with our API. 
It would be an abstract class in Typescript.
We should create specialized clients that derive from this class
instead of using it directly
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
  async getData(url) {
    const response = await this.api.get(url);
    return response.data;
  }

  async postData(url, data) {
    const response = await this.api.post(url, data);
    return response.data;
  }

  async patchData(url, data) {
    const response = await this.api.patch(url, data);
    return response.data;
  }

  async putData(url, data) {
    const response = await this.api.put(url, data);
    return response.data;
  }

  async deleteData(url, data) {
    const response = await this.api.delete(url, { data: data });
    return response.data;
  }
}
