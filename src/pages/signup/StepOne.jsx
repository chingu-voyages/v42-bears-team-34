import React, { useState, useEffect } from 'react';
import { SIGNUP_FIELDS } from './sign-up-fields';

import { SignupDataStore } from '../../services/SignupDataStore/signup-data-store';
import { STEP_STATE } from './steps-state';

import { StandardTextField } from './components/StandardTextField';
import { DropDownSelect } from './components/DropDownSelect';
import { PROVINCES } from './field-options';
import { PhoneNumberInput } from './components/PhoneNumberInput';

export default function StepOne(props) {
  const [inputs, setInputs] = useState(STEP_STATE[0]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    props.onStepDataChange && props.onStepDataChange(inputs);
  }, [inputs]);

  // When page renders, attempt to pre-populate data from sessionStorage
  useEffect(() => {
    setInputs(SignupDataStore.getData(Object.keys(inputs)));
  }, []);
  return (
    <div>
      <StandardTextField
        maxLength={50}
        fieldName={SIGNUP_FIELDS.firstName}
        fieldLabel={'First Name'}
        fieldValue={inputs[SIGNUP_FIELDS.firstName]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <StandardTextField
        maxLength={50}
        fieldName={SIGNUP_FIELDS.lastName}
        fieldLabel={'Last Name'}
        fieldValue={inputs[SIGNUP_FIELDS.lastName]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <StandardTextField
        maxLength={60}
        fieldName={SIGNUP_FIELDS.streetAddress}
        fieldLabel={'Street Address'}
        fieldValue={inputs[SIGNUP_FIELDS.streetAddress]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <StandardTextField
        maxLength={12}
        fieldName={SIGNUP_FIELDS.unitNumber}
        fieldLabel={'Unit Number'}
        fieldValue={inputs[SIGNUP_FIELDS.unitNumber]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <StandardTextField
        maxLength={40}
        fieldName={SIGNUP_FIELDS.additionalAddress}
        fieldLabel={'Additional Address'}
        fieldValue={inputs[SIGNUP_FIELDS.additionalAddress]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <StandardTextField
        maxLength={25}
        fieldName={SIGNUP_FIELDS.city}
        fieldLabel={'City'}
        fieldValue={inputs[SIGNUP_FIELDS.city]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <DropDownSelect
        className={'StepThreeInput'}
        marginBottom={3}
        fieldLabel={'Select Province'}
        options={PROVINCES}
        fieldValue={inputs[SIGNUP_FIELDS.province]}
        fieldName={SIGNUP_FIELDS.province}
        labelId={'province-label'}
        onFieldValueChanged={handleChange}
      />
      <StandardTextField
        fieldWidth={200}
        maxLength={6}
        textTransform={'uppercase'}
        fieldName={SIGNUP_FIELDS.postalCode}
        fieldLabel={'Postal code'}
        fieldValue={inputs[SIGNUP_FIELDS.postalCode]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <PhoneNumberInput
        errors={props.errors}
        fieldLabel="Phone Number"
        fieldValue={inputs[SIGNUP_FIELDS.phone]}
        onFieldValueChanged={handleChange}
        fieldName={SIGNUP_FIELDS.phone}
      />
    </div>
  );
}
