import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useEffect } from 'react';

function CustomDatePicker(props) {
  const {
    minDate,
    maxDate,
    onDateChange,
    readOnly,
    name,
    value,
    label,
    ...rest
  } = props;
  const [dateValue, setDateValue] = useState(value);

  const handleKeyboardInput = (e) => {
    // This makes sure that keyboard input is not accepted in the calendar
    if (readOnly) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    setDateValue(value);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...rest}
        label={label}
        maxDate={maxDate}
        minDate={minDate}
        openTo={'year'}
        disableFuture
        disableHighlightToday
        autoFocus
        name={name}
        renderInput={(textFieldProps) => (
          <TextField
            {...textFieldProps}
            name={name}
            onKeyDown={handleKeyboardInput}
            value={dateValue}
          />
        )}
        value={dateValue}
        onChange={(newValue) => {
          setDateValue(newValue);
          onDateChange && onDateChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
