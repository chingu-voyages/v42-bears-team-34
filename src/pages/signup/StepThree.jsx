import React, { useState, useEffect }  from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';


export default function StepThree(props) {

    const [values, setValues] = useState({
        gender: "",
        occupation: "",
        amount: "",
        use: "",
        income: ""
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

    const [errors, setErrors] = useState({});

  return (
    <div className="StepThreeForm">
        <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
            <TextField 
                type="number" 
                name="applicantIncome"
                label="What is your monthly income" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                value={values.income} 
                onChange={handleChange} />
                {errors.income && <p className="error">{errors.income}</p>}
            </FormControl>

        <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
            <InputLabel>Select gender</InputLabel>
            <Select
                labelId="genderEle"
                name="applicantGender"
                label="Gender"
                onChange={handleChange}
                {...errors.gender && <p className="error">{errors.gender}</p>}
            >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
            </Select>
        </FormControl>

        <FormControl sx={{width: 400, marginBottom: 3}}>
        <InputLabel>Select occupation</InputLabel>
            <Select
                labelId="occupationEle"
                name="applicantOccupation"
                label="Occupation"
                onChange={handleChange}
                {...errors.occupation && <p className="error">{errors.occupation}</p>}
            >
                <MenuItem value={"employee"}>Employee</MenuItem>
                <MenuItem value={"entrepreneur"}>Enterpreneur</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
            </Select>
        </FormControl>

        <FormControl sx={{width: 400, marginBottom: 3}}>
        <InputLabel>Select amount</InputLabel>
            <Select
                labelId="amountEle"
                name="requestedLoanAmount"
                label="Amount"
                onChange={handleChange}
                {...errors.amount && <p className="error">{errors.amount}</p>}
            >
                <MenuItem value={300}>$ 300</MenuItem>
                <MenuItem value={400}>$ 400</MenuItem>
                <MenuItem value={500}>$ 500</MenuItem>
                <MenuItem value={600}>$ 600</MenuItem>
                <MenuItem value={700}>$ 700</MenuItem>
                <MenuItem value={800}>$ 800</MenuItem>
                <MenuItem value={900}>$ 900</MenuItem>
                <MenuItem value={1000}>$ 1000</MenuItem>
            </Select>
        </FormControl> 

        <FormControl sx={{width: 400, marginBottom: 3}}>
        <InputLabel>Select use of loan</InputLabel>
            <Select
                labelId="useEle"
                name="loanPurpose"
                label="Use"
                onChange={handleChange}
                {...errors.use && <p className="error">{errors.use}</p>}
            >
                <MenuItem value={"rent"}>Rent</MenuItem>
                <MenuItem value={"food"}>Food</MenuItem>
                <MenuItem value={"bills"}>Bills</MenuItem>
            </Select>
        </FormControl> 
    </div>
  )
}
