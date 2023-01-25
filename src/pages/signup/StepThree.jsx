import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function StepThree(props) {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
    }

  return (
    <div className="StepThreeForm">

        <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
            <TextField 
                type="number" 
                name="income"
                label="What is your monthly income" 
                margin="normal" 
                variant="outlined" 
                color="secondary" 
                // value={income} 
                onChange={handleChange} />
            </FormControl>

        <FormControl sx={{width: 400, marginBottom: 3}} className="StepThreeInput">
            <InputLabel>Select gender</InputLabel>
            <Select
                labelId="genderEle"
                name="gender"
                label="Gender"
                onChange={handleChange}
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
                name="occupation"
                label="Occupation"
                onChange={handleChange}
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
                name="amount"
                label="Amount"
                onChange={handleChange}
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
                name="use"
                label="Use"
                onChange={handleChange}
            >
                <MenuItem value={"rent"}>Rent</MenuItem>
                <MenuItem value={"food"}>Food</MenuItem>
                <MenuItem value={"bills"}>Bills</MenuItem>
            </Select>
        </FormControl> 
    </div>
  )
}
