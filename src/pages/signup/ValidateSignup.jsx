import React from 'react';

export default function ValidateSignup(inputs, currentStep) {
    let errors = {}

    if (!inputs.firstName) {
        errors.firstName = "First name is required.";
    }
    if (!inputs.lastName) {
        errors.lastName = "last Name is required.";
    }
    if (!inputs.address) {
        errors.address = "Address is required.";
    }
    if (!inputs.city) {
        errors.city = "City is required.";
    }
    if (!inputs.province) {
        errors.province = "province is required.";
    }
    if (!inputs.postalCode) {
        errors.postalCode = "Postal code is required.";
    }
    if (!inputs.phone) {
        errors.phone = "Phone is required.";
    }


    if (!inputs.email) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+@\S+\.\S+/.test(inputs.email)) {
        errors.email = "Email is invalid.";
    }
    if (!inputs.password) {
        errors.password = "last Name is required.";
    } else if (inputs.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }
    if (!inputs.confirmPassord && password !== confirmPassord) {
        errors.confirmPassord = "The passwords must match.";
    }


    if (!inputs.income) {
        errors.income = "Income is required.";
    }
    if (!values.gender) {
        errors.gender = "Gender is required.";
    }
    if (!values.occupation) {
        errors.occupation = "Occupation is required.";
    }
    if (!values.amount) {
        errors.amount = "Amount is required.";
    }
    if (!values.use) {
        errors.use = "Use of the loan is required.";
    }
    
  return errors;
}
