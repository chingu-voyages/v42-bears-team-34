import React from 'react';
import { Box, TextField } from '@mui/material';
import { ErrorComponent } from '../ErrorComponent';
import { SIGNUP_FIELDS } from '../../pages/signup/sign-up-fields';

const FIELD_LENGTHS = {
  [SIGNUP_FIELDS.firstName]: 50,
  [SIGNUP_FIELDS.lastName]: 50,
  [SIGNUP_FIELDS.streetAddress]: 60,
  [SIGNUP_FIELDS.unitNumber]: 12,
  [SIGNUP_FIELDS.additionalAddress]: 40,
  [SIGNUP_FIELDS.city]: 25,
  [SIGNUP_FIELDS.postalCode]: 6,
};
/**
 *
 * @param {{ disabled?: boolean, inputComponent?: JSX.Element, fieldType: "text" | "password", fieldWidth? number, textTransform?:string, maxLength?: number, errors: any, fieldName: string, fieldLabel: string, fieldValue: string, onFieldValueChanged: (e) => void }} props
 */
function StandardTextField(props) {
  const {
    inputComponent,
    fieldType,
    fieldWidth,
    textTransform,
    maxLength,
    fieldName,
    fieldLabel,
    fieldValue,
    onFieldValueChanged,
    errors,
    ...rest
  } = props;

  return (
    <Box mb={3}>
      <TextField
        {...rest}
        sx={{ width: fieldWidth || 400 }}
        type={fieldType || 'text'}
        name={fieldName}
        label={fieldLabel}
        margin="normal"
        variant="outlined"
        color="secondary"
        value={fieldValue || ''}
        onChange={onFieldValueChanged}
        inputProps={{
          maxLength: maxLength || FIELD_LENGTHS[fieldName] || 255,
          style: { textTransform: textTransform || null },
          inputComponent: inputComponent,
        }}
      />
      {errors && errors[fieldName] && (
        <ErrorComponent title={errors[fieldName]} />
      )}
    </Box>
  );
}

export default StandardTextField;
