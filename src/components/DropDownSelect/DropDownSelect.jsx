import React from 'react';
import { InputLabel, Select, MenuItem, FormControl, Box } from '@mui/material';
import { ErrorComponent } from '../ErrorComponent';
import { isNil } from '../../utils/nilHelper';
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

  const handleKeyDownCapture = (event) => {
    const option = getDropDownElementFromKeyCode(
      String.fromCharCode(event.keyCode)
    );
    if (!isNil(option)) {
      onFieldValueChanged &&
        onFieldValueChanged({
          target: { name: fieldName, value: option.value },
        });
    }
  };

  const getDropDownElementFromKeyCode = (keyString) => {
    const filteredOoptions = options.filter(
      (option) => option.label[0].toLowerCase() === keyString.toLowerCase()
    );
    return filteredOoptions[0];
  };

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
          onKeyDownCapture={handleKeyDownCapture}
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
