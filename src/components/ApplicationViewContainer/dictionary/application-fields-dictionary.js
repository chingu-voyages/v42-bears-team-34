// Holds the friendly names of the fields from the Plaid data
export const APP_FIELDS_DICT = {
  account_id: "AccountID",
  account_number: "Account #",
  apr_percentage: "APR %",
  apr_type: "APR Type",
  available: "Available",
  aprs: "APRS",
  balances: "Balances",
  balance_subject_to_apr: "Balance subject to APR",
  balance_transfer_apr: "Balance Transfer APR",
  CA: "Canada",
  checking: "Chequing",
  current: "Current",
  city: "City",
  country: "Country",
  postal_code: "Postal Code", 
  disbursement_dates: "Disbursement Dates",
  description: "Description",
  end_date: "End Date",
  estimated_eligibility_date: "EST Eligibility Date",
  expected_payoff_date: "Expected payoff Date",
  guarantor: "Guarantor",
  interest_charge_amount: "Interest Charge Amount",
  interest_rate_percentage: "Interest Rate Percentage",
  interest_rate: "Interest Rate",
  iso_currency_code: "Currency",
  is_overdue: "Overdue",
  last_payment_amount: "Last Payment Amount",
  last_payment_date: "Last Payment Date",
  last_statement_balance: "Last Statement Balance",
  last_statement_issue_date: "Last Statement Issue Date",
  limit: "Limit",
  loan_name: "Loan Name",
  loan_status: "Loan Status",
  loan_term: "Loan Term",
  minimum_payment_amount: "Minimum Payment Amount",
  name: "Name",
  next_monthly_payment: "Next Monthly Payment",
  next_payment_due_date: "Next Payment Due Date",
  origination_principal_amount: "Origination Principal Amount",
  outstanding_interest_amount: "Outstanding Interest Amount",
  payments_made: "Payments Made",
  payments_remaining: "Payments Remaining",
  percentage: "Percentage",
  property_address: "Property Address",
  pslf_status: "PSLF Status",
  region: "Region",
  repayment_plan: "Repayment Plan",
  street: "Street",
  subtype: "Subtype",
  type: "Type",
  "US": "United States",
  ytd_interest_paid: "YTD Interest Paid",
  ytd_principal_paid: "YTD Principal Paid",
}

// Specify the sub-fields rendered that need a currency ($) symbol
export const CURRENCY_FIELDS = [
  "available",
  "current",
  "balance_subject_to_apr",
  "interest_charge_amount",
  "last_payment_amount",
  "last_statement_balance",
]
