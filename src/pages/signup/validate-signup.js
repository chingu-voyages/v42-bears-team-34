import { STRING_HELPERS } from '../../utils/string-helpers';
import { SIGNUP_FIELDS } from './sign-up-fields';

// An array of signup validation rules
const VALIDATION_RULES = [
  // STEP 0
  {
    name: 'First Name is required',
    fieldName: SIGNUP_FIELDS.firstName,
    rule: (field) => !field || field.trim() === '',
    validationMessage: 'First name is required',
  },
  {
    name: 'Last Name is required',
    fieldName: SIGNUP_FIELDS.lastName,
    rule: (field) => !field || field.trim() === '',
    validationMessage: 'Last name is required',
  },
  {
    name: 'Street address is required',
    fieldName: SIGNUP_FIELDS.streetAddress,
    rule: (field) => !field || field.trim() === '',
    validationMessage: 'Street address is required',
  },
  {
    name: 'City is required',
    fieldName: SIGNUP_FIELDS.city,
    rule: (field) => !field || field.trim() === '',
    validationMessage: 'City is required',
  },
  {
    name: 'Province is required',
    fieldName: SIGNUP_FIELDS.province,
    rule: (field) => !field,
    validationMessage: 'Province is required',
  },
  {
    name: 'Postal code is required',
    fieldName: SIGNUP_FIELDS.postalCode,
    rule: (field) => !field,
    validationMessage: 'Postal code is required',
  },
  {
    name: 'Valid Canadian postal code',
    fieldName: SIGNUP_FIELDS.postalCode,
    rule: (field) => !STRING_HELPERS.isCanadianPostalCodeValid(field),
    validationMessage: 'Please enter a valid Canadian postal code',
  },
  {
    name: 'Phone number is required',
    fieldName: SIGNUP_FIELDS.phone,
    rule: (field) => !field,
    validationMessage: 'Phone number is required',
  },
  {
    name: 'Phone number is not in correct format',
    fieldName: SIGNUP_FIELDS.phone,
    rule: (field) => !STRING_HELPERS.isPhoneNumberValid(field),
    validationMessage: 'Phone number is not in the correct format',
  },

  // STEP 1
  {
    name: 'E-mail address is required',
    fieldName: SIGNUP_FIELDS.email,
    rule: (field) => !field,
    validationMessage: 'E-mail address is required',
  },
  {
    name: 'E-mail address must be valid',
    fieldName: SIGNUP_FIELDS.email,
    rule: (field) => !STRING_HELPERS.isEmailValid(field),
    validationMessage: 'Enter a valid e-mail address',
  },
  {
    name: 'Enter a password',
    fieldName: SIGNUP_FIELDS.password1,
    rule: (field) => !field,
    validationMessage: 'Enter a password',
  },
  {
    name: 'Password complexity requirements',
    fieldName: SIGNUP_FIELDS.password1,
    rule: (field) => !STRING_HELPERS.isPasswordComplexityValid(field),
    validationMessage:
      'Password should be at least 8 characters and contain a number and a special character',
  },
  {
    name: 'Confirmation password needs to match the first one',
    additionalFields: [SIGNUP_FIELDS.password1],
    fieldName: SIGNUP_FIELDS.password2,
    rule: (field, additionalFields, input) => {
      if (additionalFields) {
        return field !== input[additionalFields[0]]; // Potential problem?
      }
    },
    validationMessage: 'Passwords must match.',
  },
  {
    name: 'Date of birth must be present',
    fieldName: SIGNUP_FIELDS.dateOfBirth,
    rule: (field) => !field,
    validationMessage: 'Please select date of birth',
  },
  {
    name: 'Date of birth must be in correct format',
    fieldName: SIGNUP_FIELDS.dateOfBirth,
    rule: (field) => {
      return !field.toISOString;
    },
    validationMessage: 'Date of birth should be in the correct format.',
  },
  // Step 2
  {
    name: 'Applicant income must be present',
    fieldName: SIGNUP_FIELDS.applicantIncome,
    rule: (field) => !field,
    validationMessage: 'Income is required.',
  },
  {
    name: 'Applicant gender present',
    fieldName: SIGNUP_FIELDS.applicantGender,
    rule: (field) => !field,
    validationMessage: 'Please Specify your gender',
  },
  {
    name: 'Applicant occupation present',
    fieldName: SIGNUP_FIELDS.applicantOccupation,
    rule: (field) => !field,
    validationMessage: 'Please specify your occupation',
  },
  {
    name: 'Requested loan about needs to be present',
    fieldName: SIGNUP_FIELDS.requestedLoanAmount,
    rule: (field) => !field, // We may need to fix this to insure it's a number
    validationMessage: 'Please specify the requested loan amount',
  },
  {
    name: 'Loan purpose needs to be present',
    fieldName: SIGNUP_FIELDS.loanPurpose,
    rule: (field) => !field,
    validationMessage: 'Please specify the loan purpose',
  },
  {
    name: 'Number of installments must be selected',
    fieldName: SIGNUP_FIELDS.numberOfInstallments,
    rule: (field) => !field,
    validationMessage: 'Please specify the number of installments',
  },
  {
    name: "Installment amount $ can't be null or 0",
    fieldName: SIGNUP_FIELDS.installmentAmount,
    rule: (field) =>
      field === null || field === undefined || field <= 0 || isNaN(field),
    validationMessage:
      'Please specify an installment amount greater than zero $',
  },
];

export class SignupValidator {
  /**
   *
   * @param {string[]} fields fields are an array of strings consisting of signup field names
   * @param {{[key in string]: any}} input is some object that has data that we want to validate
   * @returns {{ [key in string]: string }} an object whose keys are a fieldName and values are the error message
   */
  static validate(fields, input) {
    if (!fields || !fields.length || fields.length === 0) return {};
    if (!input) throw new Error('No input');
    let allErrors = {};
    for (const fieldName of fields) {
      // There could be more than one rule for a given field name. Grab all of the rules.
      const matchingRules = SignupValidator.#getMatchingRules(
        VALIDATION_RULES,
        fieldName
      );
      let matchingErrors = {};
      matchingErrors = SignupValidator.#getValidationErrors(
        matchingRules,
        input
      );
      allErrors = {
        ...allErrors,
        ...matchingErrors,
      };
    }
    return allErrors;
  }

  /**
   * @param {{ name: string, additionalFields?: string[], fieldName: string, rule: (field, additionalFields?: string[]), validationMessage: string }} rules
   * @param {string} fieldName
   * @returns {{ name: string, additionalFields?: string[], fieldName: string, rule: (field: string, additionalFields?: string[]) => boolean, validationMessage: string }[]} An array of rules
   */
  static #getMatchingRules(rules, fieldName) {
    // Filter to only compare rules that match the field name.
    return rules.filter((rule) => rule.fieldName === fieldName);
  }

  static #getValidationErrors(rules, input) {
    let errors = {};
    // if we found matching rule, go through each rule we've found and execute the rule's validation function
    for (const r of rules) {
      if (input[r.fieldName]) {
        const fieldData = input[r.fieldName]; // grab the field data

        // Go through validation with additionalFields
        if (r.additionalFields && r.additionalFields.length > 0) {
          if (r.rule(fieldData, r.additionalFields, input)) {
            errors[r.fieldName] = r.validationMessage;
            break;
          }
        }

        // Execute the rule and if it's true, it's a validation error
        if (r.rule(fieldData)) {
          errors[r.fieldName] = r.validationMessage;
          /* Once we find the first matching violating rule, simply break 
          so that subsequent violating rule doesn't overwrite it
          */
          break;
        }
      } else {
        errors[r.fieldName] = r.validationMessage;
      }
    }
    return errors;
  }
}
