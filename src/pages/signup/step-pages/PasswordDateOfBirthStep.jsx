import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { StandardTextField } from '../../../components/StandardTextField';
import { SIGNUP_FIELDS } from '../sign-up-fields';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { SignupDataStore } from '../../../services/SignupDataStore/signup-data-store';
import { CustomDatePicker } from '../../../components/CustomDatePicker';
import { STEP_STATE } from '../steps-state';
import { MAX_ADULT_AGE } from '../../../utils/definitions';

export default function PasswordDateOfBirthStep(props) {
  const [inputs, setInputs] = useState(STEP_STATE[0].data);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Dates are handle differently
  const handleDateChange = (dateValue) => {
    setInputs((prevState) => ({
      ...prevState,
      [SIGNUP_FIELDS.dateOfBirth]: dateValue,
    }));
  };

  useEffect(() => {
    props.onStepDataChange && props.onStepDataChange(inputs);
  }, [inputs]);

  // Preload any data from the sessionStorage
  useEffect(() => {
    setInputs(SignupDataStore.getData(Object.keys(inputs)));
  }, []);

  return (
    <Box>
      <StandardTextField
        maxLength={80}
        fieldName={SIGNUP_FIELDS.email}
        fieldLabel={'E-mail'}
        fieldValue={inputs[SIGNUP_FIELDS.email]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <Box mb={3}>
        <CustomDatePicker
          labelId="date-of-birth-label"
          label={'Date of Birth'}
          readOnly
          name={SIGNUP_FIELDS.dateOfBirth}
          maxDate={MAX_ADULT_AGE}
          value={inputs[SIGNUP_FIELDS.dateOfBirth]}
          onDateChange={handleDateChange}
        />
        {props.errors && props.errors[SIGNUP_FIELDS.dateOfBirth] && (
          <ErrorComponent title={props.errors[SIGNUP_FIELDS.dateOfBirth]} />
        )}
      </Box>
      <StandardTextField
        maxLength={64}
        fieldType={'password'}
        fieldName={SIGNUP_FIELDS.password1}
        fieldLabel={'Create a password'}
        fieldValue={inputs[SIGNUP_FIELDS.password1]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
      <StandardTextField
        maxLength={64}
        fieldType={'password'}
        fieldName={SIGNUP_FIELDS.password2}
        fieldLabel={'Confirm password'}
        fieldValue={inputs[SIGNUP_FIELDS.password2]}
        onFieldValueChanged={handleChange}
        errors={props.errors}
      />
    </Box>
  );
}
