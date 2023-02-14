import { Box, Typography } from "@mui/material";
import { STRING_HELPERS } from "../../../../../utils/string-helpers";
import { ConversionType } from "../../../application-field-conversion-type";
import { APP_FIELDS_DICT, CURRENCY_FIELDS } from "../../../dictionary/application-fields-dictionary";
export const AttributeComponent = ({ propName, propValue }) => {
  return (
    <Box display={"flex"}>
      <Box>
        <Typography fontWeight={"bold"}>{APP_FIELDS_DICT[propName]}: </Typography>
      </Box>
      <Box ml={2}>
        { renderValue(propValue) }
      </Box>
    </Box>
    )
}

function renderValue (propValue) {
  if (propValue && propValue.type) {
    if (propValue.type === ConversionType.fromObject) {
      // We have to render out the sub-keys, values from nested object
      if (propValue.data) {
        return Object.entries(propValue.data).map(( [key, value]) => (
          <AttributeFragment key={`${key}_${value}`} keyLabel={key} value={value} />
        ))
      }
    } else if (propValue.type === ConversionType.fromArrayOfObjects) {
      // Array of Objects, ie. APRS
      if (propValue.data) {
        for (const element of propValue.data) {
          // Each element is an object
          return Object.entries(element).map(( [key, value]) => (
            <AttributeFragment key={`${key}_${value}`} keyLabel={key} value={value} />
          ))
        }
      }
    }
  } else {
    return (
      <Typography fontSize={"12px"}>
       { propValue && STRING_HELPERS.capitalizeFirstLetter(APP_FIELDS_DICT[propValue.toString()] || propValue.toString()) } 
      </Typography>
    )
  }
}

const AttributeFragment = ({ keyLabel, value }) =>{
  return (
    <Box display="flex">
      <Typography fontSize={12} fontWeight={"bold"}>{APP_FIELDS_DICT[keyLabel]}:</Typography>
      <Typography fontSize={12} ml={1}>{formatFragment(keyLabel, APP_FIELDS_DICT[value] || value)}</Typography>
    </Box>
  )
}

const formatFragment = (keyLabel, value) => {
  // Check for currency
  if (CURRENCY_FIELDS.includes(keyLabel)) {
    return STRING_HELPERS.toCurrency(value)
  }

  // Check for something else? TBD

  // Otherwise just return the value, capitalized
  return STRING_HELPERS.capitalizeFirstLetter(value)
}
