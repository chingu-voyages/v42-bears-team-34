import React from 'react';
import { STRING_HELPERS } from '../../utils/string-helpers';
import { SIGNUP_FIELDS } from './sign-up-fields';
/**
 * 
 * @param {*} inputs 
 * @param {number} currentStep
 * @returns {*} errors 
 */
export function validateSignup(inputs, currentStep) {
  const errors = {}
  if (currentStep === 0) {
    if (!inputs[SIGNUP_FIELDS.firstName] || inputs[SIGNUP_FIELDS.firstName].trim() === "") {
      errors[SIGNUP_FIELDS.firstName] = "First name is required.";
    }
    if (!inputs[SIGNUP_FIELDS.lastName] || inputs[SIGNUP_FIELDS.lastName].trim() === "") {
      errors[SIGNUP_FIELDS.lastName] = "Last Name is required.";
    }
    if (!inputs[SIGNUP_FIELDS.streetAddress] || inputs[SIGNUP_FIELDS.streetAddress].trim() === "") {
        errors[SIGNUP_FIELDS.streetAddress] = "Street address is required.";
    }
    if (!inputs[SIGNUP_FIELDS.city] || inputs[SIGNUP_FIELDS.city].trim() === "") {
        errors[SIGNUP_FIELDS.city] = "City is required.";
    }
    if (!inputs[SIGNUP_FIELDS.province]) {
        errors[SIGNUP_FIELDS.province] = "Province is required.";
    }
    if (!inputs[SIGNUP_FIELDS.postalCode]) {
      errors[SIGNUP_FIELDS.postalCode] = "Postal code is required.";
    }
    if (!STRING_HELPERS.isCanadianPostalCodeValid(inputs[SIGNUP_FIELDS.postalCode])) {
      errors[SIGNUP_FIELDS.postalCode] = "Enter a valid postal code"
    }
    if (!inputs[SIGNUP_FIELDS.phone]) {
        errors[SIGNUP_FIELDS.phone] = "Phone is required.";
    }
    if (!STRING_HELPERS.isPhoneNumberValid(inputs[SIGNUP_FIELDS.phone])) {
      errors[SIGNUP_FIELDS.phone] = "Enter a valid phone number in the format 999-999-9999"
    }
  }

  if (currentStep === 1) {
    if (!inputs[SIGNUP_FIELDS.email]) {
      errors[SIGNUP_FIELDS.email] = "Email is required.";
    } else if (!STRING_HELPERS.isEmailValid(inputs[SIGNUP_FIELDS.email])) {
      errors[SIGNUP_FIELDS.email] = "Email is invalid.";
    }

    if (!inputs[SIGNUP_FIELDS.password1]) {
      errors[SIGNUP_FIELDS.password1] = "Enter a password.";
    } else if (!STRING_HELPERS.isPasswordComplexityValid(inputs[SIGNUP_FIELDS.password1])) {
      errors[SIGNUP_FIELDS.password1] = "Enter a secure, complex password";
    } 

  
    if (inputs[SIGNUP_FIELDS.password2] !== inputs[SIGNUP_FIELDS.password1]) {
      errors[SIGNUP_FIELDS.password1] = "The passwords must match.";
      errors[SIGNUP_FIELDS.password2] = "The passwords must match."
    }
  }

  if (currentStep === 2) {
    if (!inputs[SIGNUP_FIELDS.applicantIncome]) {
        errors[SIGNUP_FIELDS.applicantIncome] = "Income is required.";
    }
    if (!inputs[SIGNUP_FIELDS.applicantGender]) {
        errors[SIGNUP_FIELDS.applicantGender] = "Gender is required.";
    }
    if (!inputs[SIGNUP_FIELDS.applicantOccupation]) {
        errors[SIGNUP_FIELDS.applicantOccupation] = "Occupation is required.";
    }
    if (!inputs[SIGNUP_FIELDS.requestedLoanAmount]) {
        errors[SIGNUP_FIELDS.requestedLoanAmount] = "Amount is required.";
    }
    if (!inputs[SIGNUP_FIELDS.loanPurpose]) {
        errors[SIGNUP_FIELDS.loanPurpose] = "Please specify the purpose of the loan request.";
    }
  }
  return errors;
}

