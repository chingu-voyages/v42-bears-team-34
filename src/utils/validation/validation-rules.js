import { STRING_HELPERS } from '../string-helpers';
import { SIGNUP_FIELDS } from '../../pages/signup/sign-up-fields';
export const VALIDATION_RULES = [
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
    name: 'Verification code must be entered',
    fieldName: SIGNUP_FIELDS.verificationCode,
    rule: (field) => {
      if (!field) return true;
      if (field.trim() === '') return true;
      return false;
    },
    validationMessage: 'Please enter your e-mail verification code',
  },
];
