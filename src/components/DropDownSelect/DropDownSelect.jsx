import React from 'react';
import { InputLabel, Select, MenuItem, FormControl, Box } from '@mui/material';
import { ErrorComponent } from '../ErrorComponent';
/**
 *
 * @param {{ errors: any, options: { label: string, value: string}[],  onFieldValueChanged: (e) => void, fieldValue: string, fieldLabel: string, fieldName: string, marginBottom: number, formControlClassName: string, labelId: string }} props
 * @returns
 */
function DropDownSelect(props) {
  const {
    errors,
    options,
    fieldValue,
    formControlClassName,
    fieldLabel,
    fieldName,
    marginBottom,
    labelId,
    onFieldValueChanged,
  } = props;
  return (
    <Box mb={3}>
      <FormControl
        sx={{ width: 400, marginBottom: marginBottom || 3 }}
        className={formControlClassName}
      >
        <InputLabel shrink id={labelId}>
          {fieldLabel}
        </InputLabel>
        <Select
          labelId={labelId}
          name={fieldName}
          label={fieldLabel}
          value={fieldValue || ''}
          onChange={onFieldValueChanged}
        >
          <MenuItem value={null}></MenuItem>
          {options &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
        {errors && errors[fieldName] && (
          <ErrorComponent title={errors[fieldName]} />
        )}
      </FormControl>
    </Box>
  );
}

export default DropDownSelect;