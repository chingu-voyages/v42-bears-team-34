import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import StyledButton from '../StyledButton/StyledButton';
import { PALLET } from '../../stylings/pallet';
import { SIGNUP_FIELDS } from '../../pages/signup/sign-up-fields';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/**
 *
 * @param {{ handleConfirm: () => void; handleDecline: () => void }} props
 * @returns
 */
function DisclaimerConfirmationComponent(props) {
  const { handleConfirm, handleDecline } = props;
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    [SIGNUP_FIELDS.residency]: false,
    [SIGNUP_FIELDS.ageOfMajority]: false,
    [SIGNUP_FIELDS.confirmIncome]: false,
    [SIGNUP_FIELDS.bankruptcy]: false,
  });

  const handleCheckChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: !inputs[e.target.name],
    });
  };

  useEffect(() => {
    // Allow user to proceed once they've checked all of the confirmation boxes
    setConfirmDisabled(!Object.values(inputs).every((val) => val === true));
  }, [inputs]);

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Before we begin, please confirm:
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name={SIGNUP_FIELDS.residency}
              onChange={handleCheckChange}
              checked={inputs[SIGNUP_FIELDS.residency]}
            />
          }
          label="You are a Canadian resident"
        />
        <FormControlLabel
          control={
            <Checkbox
              name={SIGNUP_FIELDS.ageOfMajority}
              onChange={handleCheckChange}
              checked={inputs[SIGNUP_FIELDS.ageOfMajority]}
            />
          }
          label="You are 18 years old or older"
        />
        <FormControlLabel
          control={
            <Checkbox
              name={SIGNUP_FIELDS.confirmIncome}
              onChange={handleCheckChange}
              checked={inputs[SIGNUP_FIELDS.confirmIncome]}
            />
          }
          label="You have a minimum income of 1000$ (per month)"
        />
        <FormControlLabel
          control={
            <Checkbox
              name={SIGNUP_FIELDS.bankruptcy}
              onChange={handleCheckChange}
              checked={inputs[SIGNUP_FIELDS.bankruptcy]}
            />
          }
          label="You are not in bankruptcy proceedings"
        />
      </FormGroup>
      <Box
        component={'div'}
        display="flex"
        justifyContent={'space-between'}
        mt={3}
        mb={3}
      >
        <StyledButton
          onClick={handleConfirm}
          disabled={confirmDisabled}
          label={'I agree'}
          buttonColor={PALLET.mountainDewLime}
          borderRadius="20px"
          style={{ fontWeight: 'bold' }}
        />
        <StyledButton
          label={'Cancel'}
          borderRadius="20px"
          style={{ fontWeight: 'bold' }}
          onClick={handleDecline}
        />
      </Box>
      <Typography sx={{ marginTop: '10px', fontSize: '0.8rem' }}>
        Check if you are eligible or call us at 999-999-9999
      </Typography>
    </Box>
  );
}

export default DisclaimerConfirmationComponent;
