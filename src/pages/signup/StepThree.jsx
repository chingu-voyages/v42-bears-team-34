import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { SIGNUP_FIELDS } from './sign-up-fields';
import {
  GENDERS,
  LOAN_PURPOSES,
  OCCUPATIONS,
  REQUESTED_LOAN_AMOUNTS,
} from './field-options';

import { SignupDataStore } from '../../services/SignupDataStore/signup-data-store';
import { STEP_STATE } from './steps-state';

import { CurrencyNumberInput } from './components/CurrencyNumberInput';
import { DropDownSelect } from './components/DropDownSelect';

export default function StepThree(props) {
  const [values, setValues] = useState(STEP_STATE[2]);
  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    props.onStepDataChange && props.onStepDataChange(values);
  }, [values]);

  // load any data from storage for this step
  useEffect(() => {
    setValues(SignupDataStore.getData(Object.keys(values)));
  }, []);
  return (
    <Box className="StepThreeForm" mt={3}>
      <CurrencyNumberInput
        fieldName={SIGNUP_FIELDS.applicantIncome}
        fieldValue={values[SIGNUP_FIELDS.applicantIncome]}
        fieldLabel={'Monthly income'}
        fieldLabelId={'month-income-id'}
        formControlClassName={'StepThreeInput'}
        errors={props.errors}
        onFieldValueChanged={handleChange}
      />
      <DropDownSelect
        labelId="applicantGenderEle"
        options={GENDERS}
        fieldName={SIGNUP_FIELDS.applicantGender}
        fieldValue={values[SIGNUP_FIELDS.applicantGender]}
        fieldLabel={'Gender'}
        formControlClassName={'StepThreeInput'}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <DropDownSelect
        labelId="applicantOccupationEle"
        fieldName={SIGNUP_FIELDS.applicantOccupation}
        fieldLabel="Occupation"
        onFieldValueChanged={handleChange}
        fieldValue={values[SIGNUP_FIELDS.applicantOccupation]}
        options={OCCUPATIONS}
        errors={props.errors}
      />
      <DropDownSelect
        labelId="requestedLoanAmountEle"
        fieldName={SIGNUP_FIELDS.requestedLoanAmount}
        fieldLabel="Requested loan amount"
        onFieldValueChanged={handleChange}
        fieldValue={values[SIGNUP_FIELDS.requestedLoanAmount]}
        options={REQUESTED_LOAN_AMOUNTS}
        errors={props.errors}
      />
      <DropDownSelect
        labelId="numberOfInstallmentsEle"
        fieldName={SIGNUP_FIELDS.numberOfInstallments}
        fieldLabel="Number of installments"
        onFieldValueChanged={handleChange}
        fieldValue={values[SIGNUP_FIELDS.numberOfInstallments]}
        options={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val) => {
          return { value: val, label: val.toString() };
        })}
        errors={props.errors}
      />
      <CurrencyNumberInput
        fieldLabel="Installment amount $"
        fieldLabelId="installmentAmountEle"
        fieldName={SIGNUP_FIELDS.installmentAmount}
        onFieldValueChanged={handleChange}
        fieldValue={values[SIGNUP_FIELDS.installmentAmount]}
        errors={props.errors}
      />
      <DropDownSelect
        labelId="numberOfInstallmentsEle"
        fieldName={SIGNUP_FIELDS.loanPurpose}
        fieldLabel="Purpose for Loan"
        onFieldValueChanged={handleChange}
        fieldValue={values[SIGNUP_FIELDS.loanPurpose]}
        options={LOAN_PURPOSES}
        errors={props.errors}
      />
    </Box>
  );
}
