import React from 'react';
import { Box, TextField } from '@mui/material';
import { ErrorComponent } from '../../../components/ErrorComponent';
/**
 *
 * @param {{ inputComponent?: JSX.Element, fieldType: "text" | "password", fieldWidth? number, textTransform?:string, maxLength?: number, errors: any, fieldName: string, fieldLabel: string, fieldValue: string, onFieldValueChanged: (e) => void }} props
 */
export function StandardTextField(props) {
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
          maxLength: maxLength || 255,
          style : { textTransform: textTransform || null },
          inputComponent: inputComponent,
        }}
      />
      {errors && errors[fieldName] && (
        <ErrorComponent title={errors[fieldName]} />
      )}
    </Box>
  );
}
