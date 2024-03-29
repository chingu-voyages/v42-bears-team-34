import { SIGNUP_FIELDS } from './sign-up-fields';
export const STEP_STATE_ID = {
  EmailPassword: 'emailPassword',
  VerificationCode: 'verificationCode',
  UserDetails: 'userDetails',
  LoanDetails: 'loanDetails',
};

/* Initial state values of each step. If we need to add any new state,
it should be added here
*/
export const STEP_STATE = [
  {
    id: STEP_STATE_ID.EmailPassword,
    data: {
      [SIGNUP_FIELDS.email]: '',
      [SIGNUP_FIELDS.dateOfBirth]: null,
      [SIGNUP_FIELDS.password1]: '',
      [SIGNUP_FIELDS.password2]: '',
    },
  },
  {
    id: STEP_STATE_ID.VerificationCode,
    data: {
      [SIGNUP_FIELDS.verificationCode]: '',
    },
  },
  {
    id: STEP_STATE_ID.UserDetails,
    data: {
      [SIGNUP_FIELDS.emailConfirmationToken]: '',
      [SIGNUP_FIELDS.firstName]: '',
      [SIGNUP_FIELDS.lastName]: '',
      [SIGNUP_FIELDS.streetAddress]: '',
      [SIGNUP_FIELDS.unitNumber]: null,
      [SIGNUP_FIELDS.additionalAddress]: null,
      [SIGNUP_FIELDS.city]: '',
      [SIGNUP_FIELDS.province]: null,
      [SIGNUP_FIELDS.postalCode]: '',
      [SIGNUP_FIELDS.phone]: '',
    },
  },
  {
    id: STEP_STATE_ID.LoanDetails,
    data: {
      [SIGNUP_FIELDS.applicantGender]: null,
      [SIGNUP_FIELDS.applicantOccupation]: null,
      [SIGNUP_FIELDS.requestedLoanAmount]: null,
      [SIGNUP_FIELDS.installmentAmount]: null,
      [SIGNUP_FIELDS.numberOfInstallments]: null,
      [SIGNUP_FIELDS.loanPurpose]: null,
      [SIGNUP_FIELDS.applicantIncome]: 0,
    },
  },
];
