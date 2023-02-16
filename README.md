# AVCDOLOAN
## About
This app allows a person seeking a loan to apply for one by filling out their information and financial details. We use the Plaid API to connect to the applicant's financial institution data and retrieve more detailed specifics to allow the creditor / administrator (the other user of this app) to make a decision. The creditor can then subsequently approve or decline an application.

[Image](https://github.com/chingu-voyages/v42-bears-team-34/blob/916659bd00e1c9bd9be89e3a74ef526a18eec729/screenshots/home.png)
## Features (V1)
1. User login (users and admin), using token authentication
2. Application form (wizard)
3. User can view status of their applications
4. Admin can view all applications sent in
5. Admin can view a specific application, associated personal financial details and respond to the application

## Future Features
- E-mail integration
## Dependencies
1. [Plaid API](https://plaid.com/) - register with Plaid to obtain API keys.

## Deployment
- `npm run build`
## Tech stack
- ReactJS
- MongoDB and express
- Material UI (styled components)
- JWT
- React Router
- axios

## Getting Started
1. Clone the front end app and install dependencies using `npm i`
2. Clone the back-end server, which can be found [here](https://github.com/chingu-voyages/v42-bears-team-34be). Install dependencies by running `npm i`
3. Run the front end app: `npm run dev`
4. Run the back-end server: `npm run serve`

# Environment variables
VITE_DEV_API_URL=(URL for the backend)
VITE_PRODUCTION_API_URL=
