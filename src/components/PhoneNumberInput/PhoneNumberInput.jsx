import React from 'react';
import InputMask from 'react-input-mask';
import { Box, TextField } from '@mui/material';
import { ErrorComponent } from '../ErrorComponent';
function PhoneNumberInput(props) {
  const { errors, fieldLabel, fieldName, fieldValue, onFieldValueChanged } =
    props;
  return (
    <Box mb={3}>
      <InputMask
        mask="999-999-9999"
        onChange={onFieldValueChanged}
        value={fieldValue}
      >
        <TextField
          sx={{ width: 200 }}
          type="tel"
          name={fieldName}
          label={fieldLabel}
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </InputMask>
      {errors && errors[fieldName] && (
        <ErrorComponent title={errors[fieldName]} />
      )}
    </Box>
  );
}

export default PhoneNumberInput;
