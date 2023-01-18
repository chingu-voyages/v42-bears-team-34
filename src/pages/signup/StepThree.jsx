import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


export default function StepThree() {
  return (
    <div>
         <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChange}
            >
                <MenuItem value={male}>Male</MenuItem>
                <MenuItem value={female}>Female</MenuItem>
                <MenuItem value={other}>Other</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel>Select occupation</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={occupation}
                label="Occupation"
                onChange={handleChange}
            >
                <MenuItem value={employee}>Employee</MenuItem>
                <MenuItem value={entrepreneur}>Enterpreneur</MenuItem>
                <MenuItem value={other}>Other</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel>Select amount</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={amount}
                label="Amount"
                onChange={handleChange}
            >
                <MenuItem value={300}>$ 300</MenuItem>
                <MenuItem value={400}>$ 500</MenuItem>
                <MenuItem value={500}>$ 500</MenuItem>
                <MenuItem value={600}>$ 600</MenuItem>
                <MenuItem value={700}>$ 700</MenuItem>
                <MenuItem value={800}>$ 800</MenuItem>
                <MenuItem value={900}>$ 900</MenuItem>
                <MenuItem value={1000}>$ 1000</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel>Select use of loan</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={use}
                label="Use"
                onChange={handleChange}
            >
                <MenuItem value={rent}>Rent</MenuItem>
                <MenuItem value={food}>Food</MenuItem>
                <MenuItem value={bills}>Bills</MenuItem>
            </Select>
        </FormControl>
        <div>
            <Button variant="contained" color="primary">Next</Button>
        </div>
    </div>
  )
}
