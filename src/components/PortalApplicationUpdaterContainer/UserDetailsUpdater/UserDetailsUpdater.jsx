import { Box } from '@mui/material';
import React, { useState, useContext } from 'react';
import { DropDownSelect } from '../../../pages/signup/components/DropDownSelect';
import { StandardTextField } from '../../../pages/signup/components/StandardTextField';
import { GENDERS, PROVINCES } from '../../../pages/signup/field-options';
import {
  FIELD_DICT,
  SIGNUP_FIELDS,
} from '../../../pages/signup/sign-up-fields';
import { CustomDatePicker } from '../../CustomDatePicker';
import { MAX_ADULT_AGE } from '../../../utils/definitions';
import { PALLET } from '../../../stylings/pallet';
import StyledButton from '../../StyledButton/StyledButton';
import { ErrorComponent } from '../../ErrorComponent';
import { SignupValidator } from '../../../pages/signup/validate-signup';
import dayjs from 'dayjs';
import { TokenManager } from '../../../services/token-manager/token-manager';
import { UserClient } from '../../../services/api-clients/user-client';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../context/AppContext';
import { FullPageSpinner } from '../../Spinner/FullPageSpinner';
import { StyledResponsiveBox } from '../StyledResponsiveBox';
/**
 * Actual shortcut form to allow user to update their fields
 * @param {{ onUpdate: ()=> void, userData: { firstName: string, lastName: string, applicantGender: string, email: string, dateOfBirth: string, streetAddress: string, unitNumber?: string, additionalAddress?: string, city: string, province: string, postalCode: string }}} props
 * @returns
 */
function UserDetailsUpdater(props) {
  const navigate = useNavigate();
  const { userData, onUpdate } = props;
  const { user } = useContext(AppContext);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [errors, setErrors] = useState({}); // This refers to errors for individual fields in the application
  const [inputs, setInputs] = useState({
    [SIGNUP_FIELDS.firstName]: userData?.firstName || '',
    [SIGNUP_FIELDS.lastName]: userData?.lastName || '',
    [SIGNUP_FIELDS.applicantGender]: userData?.applicantGender || null,
    [SIGNUP_FIELDS.email]: userData?.email || '',
    [SIGNUP_FIELDS.dateOfBirth]: userData?.dateOfBirth
      ? new dayjs(userData.dateOfBirth)
      : null,
    [SIGNUP_FIELDS.streetAddress]: userData?.address?.streetAddress || '',
    [SIGNUP_FIELDS.unitNumber]: userData?.address?.unitNumber || '',
    [SIGNUP_FIELDS.additionalAddress]:
      userData?.address?.additionalAddress || '',
    [SIGNUP_FIELDS.city]: userData?.address?.city || '',
    [SIGNUP_FIELDS.province]: userData?.address?.province || null,
    [SIGNUP_FIELDS.postalCode]: userData?.address?.postalCode || '',
  });
  // Handle dates
  const handleDateChange = (dateValue) => {
    setInputs((prevState) => ({
      ...prevState,
      [SIGNUP_FIELDS.dateOfBirth]: dateValue,
    }));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUpdateUserDetails = async () => {
    // Ensure fields pass validation before performing request
    if (!validateFormInput()) return;
    if (!user) {
      console.error('Missing user from the app context');
      navigate('/login', { replace: true });
    }
    setSubmitDisabled(true);
    setIsBusy(true);
    const jwtToken = TokenManager.getToken();
    if (!jwtToken) navigate('/login', { replace: true });
    try {
      const userClient = new UserClient({ authToken: jwtToken });
      // Convert the date of birth to ISOString before sending as it's stored as a dayjs object in state
      const { dateOfBirth } = inputs;
      const dateStringDateOfBirth = dateOfBirth.toISOString();
      await userClient.patchUserDetails(user.id, {
        ...inputs,
        dateOfBirth: dateStringDateOfBirth,
      });
      setIsBusy(false);
      setSubmitDisabled(false);
      onUpdate && onUpdate();
    } catch (err) {
      console.log(err);
      setSubmitDisabled(false);
    }
  };

  /**
   * If this returns true, it passes validation
   * @returns boolean
   */
  const validateFormInput = () => {
    const gatheredErrors = SignupValidator.validate(
      Object.keys(inputs),
      inputs
    );
    if (Object.keys(gatheredErrors).length > 0) {
      setErrors(gatheredErrors);
      return false;
    }
    setErrors({});
    return true;
  };
  return (
    <Box>
      <StyledResponsiveBox component={'div'} className="application-container">
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.email]}
          fieldName={SIGNUP_FIELDS.email}
          fieldValue={inputs[SIGNUP_FIELDS.email]}
          onFieldValueChanged={handleChange}
          disabled={true}
          errors={errors}
        />
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.firstName]}
          fieldName={SIGNUP_FIELDS.firstName}
          fieldValue={inputs[SIGNUP_FIELDS.firstName]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.lastName]}
          fieldName={SIGNUP_FIELDS.lastName}
          fieldValue={inputs[SIGNUP_FIELDS.lastName]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <DropDownSelect
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.applicantGender]}
          fieldName={SIGNUP_FIELDS.applicantGender}
          fieldValue={inputs[SIGNUP_FIELDS.applicantGender]}
          options={GENDERS}
          labelId="gender-label"
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.streetAddress]}
          fieldName={SIGNUP_FIELDS.streetAddress}
          fieldValue={inputs[SIGNUP_FIELDS.streetAddress]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.unitNumber]}
          fieldName={SIGNUP_FIELDS.unitNumber}
          fieldValue={inputs[SIGNUP_FIELDS.unitNumber]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.additionalAddress]}
          fieldName={SIGNUP_FIELDS.additionalAddress}
          fieldValue={inputs[SIGNUP_FIELDS.additionalAddress]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.city]}
          fieldName={SIGNUP_FIELDS.city}
          fieldValue={inputs[SIGNUP_FIELDS.city]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <DropDownSelect
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.province]}
          fieldName={SIGNUP_FIELDS.province}
          fieldValue={inputs[SIGNUP_FIELDS.province]}
          options={PROVINCES}
          labelId="province-label"
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <StandardTextField
          fieldLabel={FIELD_DICT[SIGNUP_FIELDS.postalCode]}
          fieldName={SIGNUP_FIELDS.postalCode}
          textTransform={'uppercase'}
          fieldValue={inputs[SIGNUP_FIELDS.postalCode]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        {/* Date Of Birth */}
        <>
          <CustomDatePicker
            labelId="date-of-birth-label"
            label={'Date of Birth'}
            readOnly
            name={SIGNUP_FIELDS.dateOfBirth}
            maxDate={MAX_ADULT_AGE}
            value={inputs[SIGNUP_FIELDS.dateOfBirth]}
            onDateChange={handleDateChange}
          />
          {errors && errors[SIGNUP_FIELDS.dateOfBirth] && (
            <ErrorComponent title={errors[SIGNUP_FIELDS.dateOfBirth]} />
          )}
        </>
        <Box
          component={'footer'}
          display="flex"
          justifyContent={'center'}
          mt={3}
        >
          <StyledButton
            label="Update"
            onClick={handleUpdateUserDetails}
            buttonTextColor={PALLET.white}
            disabled={submitDisabled}
          />
        </Box>
      </StyledResponsiveBox>
      {isBusy && <FullPageSpinner />}
    </Box>
  );
}

export default UserDetailsUpdater;
