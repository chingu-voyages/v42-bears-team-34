import React from 'react';
import { Grid } from '@mui/material';
import { StyledGridItem } from './StyledGridItem';
import {
  FIELD_DICT,
  SIGNUP_FIELDS,
} from '../../../pages/signup/sign-up-fields';
import { STRING_HELPERS } from '../../../utils/string-helpers';
import { StyledGridContainer } from './StyledGridContainer';
import Face5Icon from '@mui/icons-material/Face5';
import { PALLET } from '../../../stylings/pallet';

/**
 * Takes once piece of user profile data for display in the application
 * Renders it in a list
 * @param {{
 * id: string,
 * applicantGender: string,
 * email: string,
 * dateOfBirth: string,
 * firstName: string,
 * lastName: string,
 * address: { streetAddress, unitNumber: string, additionalAddress: string, postalCode: string, province: string }}} props
 * @returns JSX.Element
 */
export const UserDetailsSectionComponent = (props) => {
  const { applicantGender, email, dateOfBirth, firstName, lastName, address } =
    props;
  const {
    streetAddress,
    unitNumber,
    postalCode,
    additionalAddress,
    city,
    province,
  } = address;
  return (
    <StyledGridContainer
      justifyContent={'space-evenly'}
      container
      spacing={1}
      title={'Applicant details'}
      icon={<Face5Icon fontSize="large" sx={{ color: PALLET.pineGreen }} />}
    >
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.firstName]}
          subText={firstName}
        />
      </Grid>
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.lastName]}
          subText={lastName}
        />
      </Grid>
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.applicantGender]}
          subText={STRING_HELPERS.capitalizeFirstLetter(applicantGender)}
        />
      </Grid>
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.email]}
          subText={email}
        />
      </Grid>
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.dateOfBirth]}
          subText={STRING_HELPERS.formatDate(dateOfBirth)}
        />
      </Grid>
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.streetAddress]}
          subText={streetAddress}
        />
      </Grid>
      {unitNumber && (
        <Grid item>
          <StyledGridItem
            headerText={FIELD_DICT[SIGNUP_FIELDS.unitNumber]}
            subText={unitNumber}
          />
        </Grid>
      )}
      {additionalAddress && (
        <Grid item>
          <StyledGridItem
            headerText={FIELD_DICT[SIGNUP_FIELDS.additionalAddress]}
            subText={additionalAddress}
          />
        </Grid>
      )}
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.city]}
          subText={city}
        />
      </Grid>
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.province]}
          subText={province?.toUpperCase()}
        />
      </Grid>
      <Grid item>
        <StyledGridItem
          headerText={FIELD_DICT[SIGNUP_FIELDS.postalCode]}
          subText={postalCode}
        />
      </Grid>
    </StyledGridContainer>
  );
};
