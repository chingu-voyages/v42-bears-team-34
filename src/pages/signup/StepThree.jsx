import React, { useState, useEffect }  from 'react';
import { Box, TextField } from '@mui/material';
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
  }
  useEffect(() => {
    props.onStepDataChange && props.onStepDataChange(
      values
    )
  }, [values])

  // load any data from storage for this step
  useEffect(() => {
    setValues(SignupDataStore.getData(Object.keys(values)));
  }, [])
  return (
  <Box className="StepThreeForm" mt={2}>
    <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
      <TextField 
        labelId="month-income-id"
        label="Monthly income"
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
        name={SIGNUP_FIELDS.applicantIncome}
        // label="What is your monthly income?" 
        margin="normal" 
        variant="outlined" 
        color="secondary" 
        value={values[SIGNUP_FIELDS.applicantIncome] || ""} 
        onChange={handleChange}
       />
      {props.errors && props.errors[SIGNUP_FIELDS.applicantIncome] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantIncome]} />}
    </FormControl>

    <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
      <InputLabel id="applicantGenderEle" shrink={true}>Gender</InputLabel>
      <Select
        labelId="applicantGenderEle"
        name={SIGNUP_FIELDS.applicantGender}
        label="Gender"
        onChange={handleChange} 
        value={values[SIGNUP_FIELDS.applicantGender] || ""}
        >
        <MenuItem value={null}></MenuItem>
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
        <MenuItem value={"other"}>Other</MenuItem>
      </Select>
      {props.errors && props.errors[SIGNUP_FIELDS.applicantGender] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantGender]} />}
    </FormControl>

  <FormControl sx={{width: 400, marginBottom: 3}}>
  <InputLabel id="applicantOccupationEle" shrink={true}>Occupation</InputLabel>
    <Select
      labelId="applicantOccupationEle"
      name={SIGNUP_FIELDS.applicantOccupation}
      label="Occupation"
      onChange={handleChange}
      value={values[SIGNUP_FIELDS.applicantOccupation] || ""}
      >
      <MenuItem value={null}></MenuItem>
      <MenuItem value={"employee"}>Employee</MenuItem>
      <MenuItem value={"entrepreneur"}>Entrepreneur</MenuItem>
      <MenuItem value={"other"}>Other</MenuItem>
    </Select>
    {props.errors && props.errors[SIGNUP_FIELDS.applicantOccupation] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantOccupation]} />}
  </FormControl>

  <FormControl sx={{width: 400, marginBottom: 3}}>
    <InputLabel id="requestedLoanAmountEle" shrink={true}>Requested loan amount</InputLabel>
      <Select
        labelId="requestedLoanAmountEle"
        name={SIGNUP_FIELDS.requestedLoanAmount}
        label="Requested loan amount"
        onChange={handleChange}
        value={values[SIGNUP_FIELDS.requestedLoanAmount] || ""}
        >
          <MenuItem value={null}></MenuItem>
          <MenuItem value={300}>$ 300</MenuItem>
          <MenuItem value={400}>$ 400</MenuItem>
          <MenuItem value={500}>$ 500</MenuItem>
          <MenuItem value={600}>$ 600</MenuItem>
          <MenuItem value={700}>$ 700</MenuItem>
          <MenuItem value={800}>$ 800</MenuItem>
          <MenuItem value={900}>$ 900</MenuItem>
          <MenuItem value={1000}>$ 1000</MenuItem>
      </Select>
      {props.errors && props.errors[SIGNUP_FIELDS.requestedLoanAmount] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.requestedLoanAmount]} />}
    </FormControl> 
    <FormControl sx={{width: 400, marginBottom: 3}}>
      <InputLabel id="numberOfInstallmentsEle" shrink={true}>Number of installments</InputLabel>
      {/* number of installments */}
      <Select
        labelId="numberOfInstallmentsEle"
        name={SIGNUP_FIELDS.numberOfInstallments}
        label="Number of installments"
        onChange={handleChange}
        value={values[SIGNUP_FIELDS.numberOfInstallments] || ""}
      >
        <MenuItem value={null}></MenuItem>
        {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((installmentValue) => (
          <MenuItem value={installmentValue} key={`${SIGNUP_FIELDS.numberOfInstallments}_${installmentValue}`}>
            {installmentValue.toString()}
          </MenuItem>
        ))}
      </Select>
      {props.errors && props.errors[SIGNUP_FIELDS.numberOfInstallments] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.numberOfInstallments]} />}
    </FormControl>
    <FormControl>
      <InputLabel id="installmentAmountEle" shrink={true}>Installment amount $</InputLabel>
        <TextField
          labelId="installmentAmountEle"
          sx={{width:200}}
          name={SIGNUP_FIELDS.installmentAmount}
          margin="normal" 
          variant="outlined"
          color="secondary"
          onChange={handleChange} 
          value={values[SIGNUP_FIELDS.installmentAmount] || ""}
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
        />
      {props.errors && props.errors[SIGNUP_FIELDS.installmentAmount] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.installmentAmount]} />}
    </FormControl>
    <FormControl sx={{width: 400, marginBottom: 3}}>
      <InputLabel id="loanPurposeEle" shrink={true}>Purpose for Loan</InputLabel>
      <Select
        labelId="loanPurposeEle"
        name={SIGNUP_FIELDS.loanPurpose}
        label="Purpose for Loan"
        onChange={handleChange}
        value={values[SIGNUP_FIELDS.loanPurpose] || ""}
        >
          <MenuItem value={null}></MenuItem>
          <MenuItem value={"rent"}>Rent</MenuItem>
          <MenuItem value={"food"}>Food</MenuItem>
          <MenuItem value={"bills"}>Bills</MenuItem>
      </Select>
      {props.errors && props.errors[SIGNUP_FIELDS.loanPurpose] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.loanPurpose]} />}
    </FormControl> 
  </Box>
  )
}
