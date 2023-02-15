/**
 * This handles storing and retrieving questionnaire data to/from sessionStorage
 */

import dayjs from "dayjs";
import { SIGNUP_FIELDS } from "../../pages/signup/sign-up-fields";

export class SignupDataStore {
  /**
   * Input should be in the form of an object
   * @param {{ [key in string]: string }} data 
   */
  static putData (data) {
    //TODO: Refactor this
    const session = window.sessionStorage;
    for (const [ key, value ] of Object.entries(data)) {
      // Iterate through the object keys and set the data in sessionStorage

      // We have to take special consideration for dates and adapt it to a string as sessionStorage can only contain strings
      if (key === SIGNUP_FIELDS.dateOfBirth) {
        if (value && value.toISOString) {
          const isoStringDate = value.toISOString();
          session.setItem(key, isoStringDate)
        } else {
          console.warn("Data store error (PUT) - date format is not a dayjs object ")
        }
      } else if (key === SIGNUP_FIELDS.unitNumber || key ===  SIGNUP_FIELDS.additionalAddress) {
          // Special case as these fields are optional
          if (!value) {
            session.removeItem(key);
          } else {
            if (value && value.trim && value.trim() === "") {
              session.removeItem(key)
            } else {
              session.setItem(key, value);
            }
          }
      } else {
        if (value) {
          session.setItem(key, value);
        }
      }
    }
  }

  /**
   * Pass in an array of strings (keys) for the data that you want to fetch
   * It should return an object
   * @param {string[]} data
   * @returns {{ [key in string]: string }}
   */
  static getData (data) {
    const obj = {};
    const session = window.sessionStorage;
    for (let key of data) {

      // Consider dates. They will be in string format => adapt it to dayjs object
      if (key === SIGNUP_FIELDS.dateOfBirth) {
        const storedDateValue = session.getItem(key);
        if (storedDateValue) {
          const daysObject = new dayjs(storedDateValue);
          if (!daysObject.toISOString) {
            // Make sure that the new object has
            console.error("Data store (GET) - cannot convert from string to dayjs object");
            obj[key] = null;
          } else {
            obj[key] = daysObject;
          }
        } else {
          // If no stored value, default to null
          obj[key] = null;
        }
      } else {
        obj[key] = session.getItem(key);
      }
    }
    return obj;
  }
}
