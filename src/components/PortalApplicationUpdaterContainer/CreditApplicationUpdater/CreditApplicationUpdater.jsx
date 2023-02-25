import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { CurrencyNumberInput } from '../../../pages/signup/components/CurrencyNumberInput';
import { DropDownSelect } from '../../../pages/signup/components/DropDownSelect';
import { SIGNUP_FIELDS } from '../../../pages/signup/sign-up-fields';
import { StyledResponsiveBox } from '../StyledResponsiveBox';
import {
  REQUESTED_LOAN_AMOUNTS,
  OCCUPATIONS,
  LOAN_PURPOSES,
} from '../../../pages/signup/field-options';
import { useGetInstallmentValues } from '../../../hooks/UseGetInstallmentValues';
import StyledButton from '../../StyledButton/StyledButton';
import { PALLET } from '../../../stylings/pallet';
import { TokenManager } from '../../../services/token-manager/token-manager';
import { useNavigate, useParams } from 'react-router-dom';
import { SignupValidator } from '../../../pages/signup/validate-signup';
import { ApplicationClient } from '../../../services/api-clients/application-client';
function CreditApplicationUpdater(props) {
  const { applicationData, onUpdate } = props;
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [inputsChangeCount, setInputsChangeCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    [SIGNUP_FIELDS.applicantIncome]:
      applicationData[SIGNUP_FIELDS.applicantIncome] || 0,
    [SIGNUP_FIELDS.requestedLoanAmount]:
      applicationData[SIGNUP_FIELDS.requestedLoanAmount] || null,
    [SIGNUP_FIELDS.applicantOccupation]:
      applicationData[SIGNUP_FIELDS.applicantOccupation] || null,
    [SIGNUP_FIELDS.installmentAmount]:
      applicationData[SIGNUP_FIELDS.installmentAmount] || null,
    [SIGNUP_FIELDS.numberOfInstallments]:
      applicationData[SIGNUP_FIELDS.numberOfInstallments] || null,
    [SIGNUP_FIELDS.loanPurpose]:
      applicationData[SIGNUP_FIELDS.loanPurpose] || null,
  });
  const [errors, setErrors] = useState({});
  const [installmentValues, errorMessage] = useGetInstallmentValues(
    inputs[SIGNUP_FIELDS.requestedLoanAmount]
  );
  const handleChange = (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
    setInputsChangeCount(inputsChangeCount + 1);
  };

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
      setInputs((prevState) => ({
        ...prevState,
        [SIGNUP_FIELDS.numberOfInstallments]: e.target.value,
        [SIGNUP_FIELDS.installmentAmount]:
          installmentValues[e.target.value && e.target.value.toString()],
      }));
    }
    setInputsChangeCount(inputsChangeCount + 1);
  };

  const handleLoanAmountChanged = (e) => {
    const newAmount = parseInt(e.target.value);
    setInputs({
      ...inputs,
      [SIGNUP_FIELDS.requestedLoanAmount]: newAmount,
    });
  };

  const handleUpdateCreditApplication = async () => {
    // Validate content
    if (!areInputsValid()) return;
    const jwtToken = TokenManager.getToken();
    if (!jwtToken) {
      navigate('/login');
      return;
    }
    try {
      setSubmitDisabled(true);
      const applicationClient = new ApplicationClient({ authToken: jwtToken });
      await applicationClient.patchExistingApplication(id, inputs);
      setSubmitDisabled(false);
      onUpdate && onUpdate();
    } catch (error) {
      console.error(error);
      setSubmitDisabled(false);
    }
  };

  const areInputsValid = () => {
    const validationErrors = SignupValidator.validate(
      Object.keys(inputs),
      inputs
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };
  useEffect(() => {
    const newInstallment =
      installmentValues[inputs[SIGNUP_FIELDS.numberOfInstallments]];
    setInputs((s) => ({
      ...s,
      [SIGNUP_FIELDS.installmentAmount]: newInstallment,
    }));
  }, [inputs[SIGNUP_FIELDS.requestedLoanAmount], installmentValues]);
  return (
    <Box>
      <StyledResponsiveBox component={'div'} className="credit-container">
        <DropDownSelect
          fieldName={SIGNUP_FIELDS.applicantOccupation}
          fieldLabel={'Occupation'}
          fieldLabelId={'applicant-occupation'}
          options={OCCUPATIONS}
          fieldValue={inputs[SIGNUP_FIELDS.applicantOccupation]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <CurrencyNumberInput
          fieldLabel="Income"
          fieldLabelId="income"
          fieldName={SIGNUP_FIELDS.applicantIncome}
          fieldValue={inputs[SIGNUP_FIELDS.applicantIncome]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <DropDownSelect
          fieldName={SIGNUP_FIELDS.loanPurpose}
          fieldLabel={'Purpose for Loan'}
          fieldLabelId={'purpose-for-loan'}
          options={LOAN_PURPOSES}
          fieldValue={inputs[SIGNUP_FIELDS.loanPurpose]}
          onFieldValueChanged={handleChange}
          errors={errors}
        />
        <DropDownSelect
          fieldName={SIGNUP_FIELDS.requestedLoanAmount}
          fieldLabel={'Requested Loan Amount'}
          fieldLabelId={'requested-loan-amount'}
          options={REQUESTED_LOAN_AMOUNTS}
          fieldValue={inputs[SIGNUP_FIELDS.requestedLoanAmount]}
          onFieldValueChanged={handleLoanAmountChanged}
          errors={errors}
        />
        <DropDownSelect
          labelId="numberOfInstallmentsEle"
          fieldName={SIGNUP_FIELDS.numberOfInstallments}
          fieldLabel="Number of installments"
          onFieldValueChanged={handleInstallmentAmountChanged}
          fieldValue={inputs[SIGNUP_FIELDS.numberOfInstallments]}
          options={getNumberOfInstallmentsOptions()}
          errors={props.errors}
        />
        <Box
          component={'footer'}
          display="flex"
          justifyContent={'center'}
          mt={3}
        >
          <StyledButton
            label="Update"
            onClick={handleUpdateCreditApplication}
            buttonTextColor={PALLET.white}
            disabled={submitDisabled || inputsChangeCount === 0}
          />
        </Box>
      </StyledResponsiveBox>
    </Box>
  );
}
export default CreditApplicationUpdater;
