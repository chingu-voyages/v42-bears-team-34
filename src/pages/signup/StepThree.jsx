import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { SIGNUP_FIELDS } from './sign-up-fields';
import { ErrorComponent } from '../../components/ErrorComponent';
import { NumericFormat } from 'react-number-format';
import { SignupDataStore } from '../../services/SignupDataStore/signup-data-store';
import { STEP_STATE } from './steps-state';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const NumberFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

export default function StepThree(props) {
  const [values, setValues] = useState(STEP_STATE[2]);
  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  /*
    your next line is: "shouldn't we separate business logic from presentation layer?"
    the answer is yes!
    the available plans should be fetched from the backend
    today I may be able loan 1000, tomorrow it could be 10000, interest rates change, etc.
  */
  function calculatePaymentSize(presentValue, numberOfPayments){
    if(isNaN(presentValue) || presentValue <= 0 ||
       isNaN(numberOfPayments) || numberOfPayments <= 0
    ){
      return 0
    }
    // 10% per year
    const annualInterest = 0.1
    // in some places you'll see annualInterest/12, annualInterest ^ (1/12) is also acceptable
    const interest = (1 + annualInterest)**(1/12) - 1

    let paymentSize =
      presentValue * ((1+interest)**(numberOfPayments) * interest) /
                      ((1+interest)**(numberOfPayments) -1)
    // round it off
    return paymentSize.toFixed(2)
  }

  // changing the amount after setting the number of  installments
  const handleAmountChange = (e) =>{
    let newAmount = parseInt(e.target.value)
    let newInstallment = calculatePaymentSize(
      newAmount,
      values[SIGNUP_FIELDS.numberOfInstallments]
    )
    setValues({
      ...values,
      [SIGNUP_FIELDS.requestedLoanAmount] : newAmount,
      [SIGNUP_FIELDS.installmentAmount]   : newInstallment
    })
  }

  // changing the number of installments after setting the amount
  const handleInstallmentChange = (e) =>{
    let newInstallments = parseInt(e.target.value)
    let newInstallment = calculatePaymentSize(
      values[SIGNUP_FIELDS.requestedLoanAmount],
      newInstallments
    )
    setValues({
      ...values,
      [SIGNUP_FIELDS.numberOfInstallments] : newInstallments,
      [SIGNUP_FIELDS.installmentAmount]    : newInstallment
    })
  }

  useEffect(() => {
    props.onStepDataChange && props.onStepDataChange(values);
  }, [values]);

  // load any data from storage for this step
  useEffect(() => {
    setValues(SignupDataStore.getData(Object.keys(values)));
  }, []);
  return (
    <Box className="StepThreeForm" mt={3}>
      <FormControl
        sx={{ width: 400, marginBottom: 3 }}
        className="StepThreeInput"
      >
        <TextField
          labelId="month-income-id"
          label="Monthly income"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          name={SIGNUP_FIELDS.applicantIncome}
          // label="What is your monthly income?"
          margin="normal"
          variant="outlined"
          color="secondary"
          value={values[SIGNUP_FIELDS.applicantIncome] || ''}
          onChange={handleChange}
        />
        {props.errors && props.errors[SIGNUP_FIELDS.applicantIncome] && (
          <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantIncome]} />
        )}
      </FormControl>

      <FormControl
        sx={{ width: 400, marginBottom: 3 }}
        className="StepThreeInput"
      >
        <InputLabel id="applicantGenderEle" shrink={true}>
          Gender
        </InputLabel>
        <Select
          labelId="applicantGenderEle"
          name={SIGNUP_FIELDS.applicantGender}
          label="Gender"
          onChange={handleChange}
          value={values[SIGNUP_FIELDS.applicantGender] || ''}
        >
          <MenuItem value={null}></MenuItem>
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
        {props.errors && props.errors[SIGNUP_FIELDS.applicantGender] && (
          <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantGender]} />
        )}
      </FormControl>

      <FormControl sx={{ width: 400, marginBottom: 3 }}>
        <InputLabel id="applicantOccupationEle" shrink={true}>
          Occupation
        </InputLabel>
        <Select
          labelId="applicantOccupationEle"
          name={SIGNUP_FIELDS.applicantOccupation}
          label="Occupation"
          onChange={handleChange}
          value={values[SIGNUP_FIELDS.applicantOccupation] || ''}
        >
          <MenuItem value={null}></MenuItem>
          <MenuItem value={'employee'}>Employee</MenuItem>
          <MenuItem value={'entrepreneur'}>Entrepreneur</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
        {props.errors && props.errors[SIGNUP_FIELDS.applicantOccupation] && (
          <ErrorComponent
            title={props.errors[SIGNUP_FIELDS.applicantOccupation]}
          />
        )}
      </FormControl>

      <FormControl sx={{ width: 400, marginBottom: 3 }}>
        <InputLabel id="requestedLoanAmountEle" shrink={true}>
          Requested loan amount
        </InputLabel>
        <Select
          labelId="requestedLoanAmountEle"
          name={SIGNUP_FIELDS.requestedLoanAmount}
          label="Requested loan amount"
          onChange={handleAmountChange}
          value={values[SIGNUP_FIELDS.requestedLoanAmount]}
        >
          <MenuItem value={null}>Choose an amount</MenuItem>
          <MenuItem value={300}>$ 300</MenuItem>
          <MenuItem value={400}>$ 400</MenuItem>
          <MenuItem value={500}>$ 500</MenuItem>
          <MenuItem value={600}>$ 600</MenuItem>
          <MenuItem value={700}>$ 700</MenuItem>
          <MenuItem value={800}>$ 800</MenuItem>
          <MenuItem value={900}>$ 900</MenuItem>
          <MenuItem value={1000}>$ 1000</MenuItem>
        </Select>
        {props.errors && props.errors[SIGNUP_FIELDS.requestedLoanAmount] && (
          <ErrorComponent
            title={props.errors[SIGNUP_FIELDS.requestedLoanAmount]}
          />
        )}
      </FormControl>

      <FormControl sx={{ width: 400, marginBottom: 2 }}>
        <InputLabel id="numberOfInstallmentsEle" shrink={true}>
          Payment plan
        </InputLabel>
    
        {/* number of installments */}
        <Select
          disabled={
            !values[SIGNUP_FIELDS.requestedLoanAmount]
          }
          labelId="numberOfInstallmentsEle"
          name={SIGNUP_FIELDS.numberOfInstallments}
          label="Number of installments"
          onChange={handleInstallmentChange}
          value={values[SIGNUP_FIELDS.numberOfInstallments] || ''}
          sx={{ width: 400}}
        >
          {/*<MenuItem value={null}></MenuItem>*/}
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((installmentValue) => (
            <MenuItem
              value={installmentValue}
              key={`${SIGNUP_FIELDS.numberOfInstallments}_${installmentValue}`}
            >
              {installmentValue} x {calculatePaymentSize(parseFloat(values[SIGNUP_FIELDS.requestedLoanAmount]),installmentValue)}
            </MenuItem>
          ))}
        </Select>

        {props.errors && props.errors[SIGNUP_FIELDS.numberOfInstallments] && (
          <ErrorComponent
            title={props.errors[SIGNUP_FIELDS.numberOfInstallments]}
          />
        )}
      </FormControl>
    
      <FormControl sx={{ width: 400, marginBottom: 3 }}>
        <InputLabel id="loanPurposeEle" shrink={true}>
          Purpose for Loan
        </InputLabel>
        <Select
          labelId="loanPurposeEle"
          name={SIGNUP_FIELDS.loanPurpose}
          label="Purpose for Loan"
          onChange={handleChange}
          value={values[SIGNUP_FIELDS.loanPurpose] || ''}
        >
          <MenuItem value={null}></MenuItem>
          <MenuItem value={'rent'}>Rent</MenuItem>
          <MenuItem value={'food'}>Food</MenuItem>
          <MenuItem value={'bills'}>Bills</MenuItem>
        </Select>
        {props.errors && props.errors[SIGNUP_FIELDS.loanPurpose] && (
          <ErrorComponent title={props.errors[SIGNUP_FIELDS.loanPurpose]} />
        )}
      </FormControl>
    </Box>
  );
}
