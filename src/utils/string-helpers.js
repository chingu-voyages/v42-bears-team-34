import dayjs from 'dayjs';
export const STRING_HELPERS = {
  /**
   *
   * @param {string} email
   * @returns {boolean}
   */
  isEmailValid: (email) => {
    const regEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
  },

  /**
   *
   * @param {string} postalCode
   * @returns {boolean}
   */
  isCanadianPostalCodeValid: (postalCode) => {
    const regEx =
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return regEx.test(postalCode);
  },

  isPhoneNumberValid: (tn) => {
    const regEx = /^(1-)?\d{3}-\d{3}-\d{4}$/;
    return regEx.test(tn);
  },
  isPasswordComplexityValid: (pwd) => {
    const regEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regEx.test(pwd);
  },
  formatDate: (input) => {
    return dayjs(input).format('YYYY-MMM-D');
  },
  formatToCurrency: (input) => {
    return `$${input}`;
  },
  capitalizeFirstLetter: (string) => {
    if (string && string.charAt) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  },
  removeQuotesFromJSONString: (string) => {
    return string.replace(/['"]+/g, '');
  },
  toCurrency: (string) => {
    if (string && string.toLocaleString) {
      const converted = string.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return converted;
    }
    return string;
  },
};
