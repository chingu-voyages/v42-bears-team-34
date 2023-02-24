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
import { useGetInstallmentValues } from '../../hooks/UseGetInstallmentValues';
import { ErrorComponent } from '../../components/ErrorComponent';

export default function StepThree(props) {
  const [values, setValues] = useState(STEP_STATE[2]);
  const [installmentValues, errorMessage] = useGetInstallmentValues(
    values[SIGNUP_FIELDS.requestedLoanAmount]
  );

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

  const getNumberOfInstallmentsOptions = () => {
    if (installmentValues) {
      return Object.entries(installmentValues).map(([key, value]) => {
        return { value: key, label: `${key.toString()} x $ ${value}` };
      });
    }
    return { label: '', value: null };
  };

  const handleInstallmentAmountChanged = (e) => {
    if (installmentValues) {
      setValues((prevState) => ({
        ...prevState,
        [SIGNUP_FIELDS.numberOfInstallments]: e.target.value,
        [SIGNUP_FIELDS.installmentAmount]:
          installmentValues[e.target.value && e.target.value.toString()],
      }));
    }
  };

  const handleLoanAmountChanged = (e) => {
    const newAmount = parseInt(e.target.value);
    setValues({
      ...values,
      [SIGNUP_FIELDS.requestedLoanAmount]: newAmount,
    });
  };

  useEffect(() => {
    const newInstallment =
      installmentValues[values[SIGNUP_FIELDS.numberOfInstallments]];
    setValues((s) => ({
      ...s,
      [SIGNUP_FIELDS.installmentAmount]: newInstallment,
    }));
  }, [values[SIGNUP_FIELDS.requestedLoanAmount], installmentValues]);

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
        onFieldValueChanged={handleLoanAmountChanged}
        fieldValue={values[SIGNUP_FIELDS.requestedLoanAmount]}
        options={REQUESTED_LOAN_AMOUNTS}
        errors={props.errors}
      />
      <DropDownSelect
        labelId="numberOfInstallmentsEle"
        fieldName={SIGNUP_FIELDS.numberOfInstallments}
        fieldLabel="Number of installments"
        onFieldValueChanged={handleInstallmentAmountChanged}
        fieldValue={values[SIGNUP_FIELDS.numberOfInstallments]}
        options={getNumberOfInstallmentsOptions()}
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
      {errorMessage && <ErrorComponent title={errorMessage} />}
    </Box>
  );
}
