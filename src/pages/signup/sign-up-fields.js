export const SIGNUP_FIELDS = {
  // Confirmation
  residency: 'residency',
  ageOfMajority: 'ageOfMajority',
  confirmIncome: 'confirmIncome',
  bankruptcy: 'bankruptcy',

  // Step 0
  email: 'email',
  dateOfBirth: 'dateOfBirth',
  password1: 'password1',
  password2: 'password2',

  // Step 1
  verificationCode: 'emailConfirmationToken',
  firstName: 'firstName',
  lastName: 'lastName',
  streetAddress: 'streetAddress',
  additionalAddress: 'additionalAddress',
  unitNumber: 'unitNumber',
  city: 'city',
  province: 'province',
  postalCode: 'postalCode',
  phone: 'phone',

  // Step 2
  applicantIncome: 'applicantIncome',
  applicantGender: 'applicantGender',
  applicantOccupation: 'applicantOccupation',

  numberOfInstallments: 'numberOfInstallments',
  installmentAmount: 'installmentAmount',

  requestedLoanAmount: 'requestedLoanAmount',
  loanPurpose: 'loanPurpose',
};

export const FIELD_DICT = {
  verificationCode: 'E-mail Confirmation Token',
  firstName: 'First Name',
  lastName: 'Last Name',
  streetAddress: 'Street Address',
  additionalAddress: 'Additional Address',
  unitNumber: 'Unit Number',
  city: 'City',
  name: 'Name',
  province: 'Province',
  postalCode: 'Postal Code',
  phone: 'Phone Number',
  email: 'E-mail Address',
  dateOfBirth: 'Date of Birth',
  password1: 'Enter Your Password',
  password2: 'Confirm Your Password',
  applicantIncome: 'Income',
  applicantGender: 'Gender',
  applicantOccupation: 'Occupation',
  numberOfInstallments: 'Number of Installments',
  installmentAmount: 'Installment Amount',
  requestedLoanAmount: 'Loan Amount Requested',
  loanPurpose: 'Purpose for Loan',
  updatedAt: 'Last Updated',
  applicationStatus: {
    approved: 'Approved',
    rejected: 'Rejected',
    incomplete: 'Incomplete',
    pending: 'Pending',
    cancelled: 'Cancelled',
    more_info_required: 'More information Requested',
  },
};
