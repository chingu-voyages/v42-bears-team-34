import { VALIDATION_RULES } from './validation-rules';

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
