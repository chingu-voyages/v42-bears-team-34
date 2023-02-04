import React, { useState, useEffect }  from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { SIGNUP_FIELDS } from './sign-up-fields';
import { ErrorComponent } from '../../components/ErrorComponent';
import { NumericFormat } from 'react-number-format';

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
  const [values, setValues] = useState({
    [SIGNUP_FIELDS.applicantGender]: "",
    [SIGNUP_FIELDS.applicantOccupation]: "",
    [SIGNUP_FIELDS.requestedLoanAmount]: "",
    [SIGNUP_FIELDS.loanPurpose]: "",
    [SIGNUP_FIELDS.applicantIncome]: 0
  });
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

  return (
  <div className="StepThreeForm">
    <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
      <TextField 
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
        name={SIGNUP_FIELDS.applicantIncome}
        label="What is your monthly income?" 
        margin="normal" 
        variant="outlined" 
        color="secondary" 
        value={values[SIGNUP_FIELDS.applicantIncome]} 
        onChange={handleChange}
       />
      {props.errors && props.errors[SIGNUP_FIELDS.applicantIncome] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantIncome]} />}
    </FormControl>

    <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
      <InputLabel>Select gender</InputLabel>
      <Select
        labelId="applicantGenderEle"
        name={SIGNUP_FIELDS.applicantGender}
        label="Gender"
        onChange={handleChange}
        >
        <MenuItem value={undefined}></MenuItem>
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
        <MenuItem value={"other"}>Other</MenuItem>
      </Select>
      {props.errors && props.errors[SIGNUP_FIELDS.applicantGender] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantGender]} />}
    </FormControl>

  <FormControl sx={{width: 400, marginBottom: 3}}>
  <InputLabel>Select occupation</InputLabel>
    <Select
      labelId="applicantOccupationEle"
      name={SIGNUP_FIELDS.applicantOccupation}
      label="Occupation"
      onChange={handleChange}
      >
      <MenuItem value={undefined}></MenuItem>
      <MenuItem value={"employee"}>Employee</MenuItem>
      <MenuItem value={"entrepreneur"}>Entrepreneur</MenuItem>
      <MenuItem value={"other"}>Other</MenuItem>
    </Select>
    {props.errors && props.errors[SIGNUP_FIELDS.applicantOccupation] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.applicantOccupation]} />}
  </FormControl>

  <FormControl sx={{width: 400, marginBottom: 3}}>
    <InputLabel>Select amount</InputLabel>
      <Select
        labelId="requestedLoanAmountEle"
        name={SIGNUP_FIELDS.requestedLoanAmount}
        label="Amount"
        onChange={handleChange}
        >
          <MenuItem value={undefined}></MenuItem>
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
    <InputLabel>Select use of loan</InputLabel>
      <Select
        labelId="useEle"
        name={SIGNUP_FIELDS.loanPurpose}
        label="Use"
        onChange={handleChange}
        >
          <MenuItem value={undefined}></MenuItem>
          <MenuItem value={"rent"}>Rent</MenuItem>
          <MenuItem value={"food"}>Food</MenuItem>
          <MenuItem value={"bills"}>Bills</MenuItem>
      </Select>
      {props.errors && props.errors[SIGNUP_FIELDS.loanPurpose] && <ErrorComponent title={props.errors[SIGNUP_FIELDS.loanPurpose]} />}
    </FormControl> 
  </div>
  )
}
