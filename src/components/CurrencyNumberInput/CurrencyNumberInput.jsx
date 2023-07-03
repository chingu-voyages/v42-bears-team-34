import React from 'react';
import { NumericFormat } from 'react-number-format';
import { ErrorComponent } from '../ErrorComponent';
import { FormControl, TextField, Box } from '@mui/material';

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

/**
 *
 * @param {{ errors: any,
 * marginBottom?: number,
 * fieldName: string,
 * fieldValue: string,
 * fieldLabel: string,
 * fieldLabelId: string,
 * formControlClassName: string,
 * onFieldValueChanged: (e) => void
 * }} props
 * @returns
 */
function CurrencyNumberInput(props) {
  const {
    errors,
    marginBottom,
    fieldName,
    fieldValue,
    fieldLabel,
    fieldLabelId,
    formControlClassName,
    onFieldValueChanged,
  } = props;
  return (
    <Box mb={3}>
      <FormControl
        sx={{ width: 400, marginBottom: marginBottom || 3 }}
        className={formControlClassName}
      >
        <TextField
          labelId={fieldLabelId}
          label={fieldLabel}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          name={fieldName}
          margin="normal"
          variant="outlined"
          color="secondary"
          value={fieldValue || ''}
          onChange={onFieldValueChanged}
        />
        {errors && errors[fieldName] && (
          <ErrorComponent title={errors[fieldName]} />
        )}
      </FormControl>
    </Box>
  );
}

export default CurrencyNumberInput