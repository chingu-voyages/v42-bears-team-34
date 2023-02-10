import { createContext, useReducer, ReactNode } from "react";
import { APP_ACTIONS } from "./app.actions";


const initialState = {
  hasLinkTokenError: false,
  // Provide error details
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: ""
  },

  // User is logged in with a token
  isAuthenticated: false,

  // Link process went through
  linkSuccess: false,
  linkToken: null,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    role: 'user',
    iat: null,
    exp: null,
    expired: undefined
  },
  // We could use this to keep track of which stage the sign-up (application) process is in
  signUpProgress: null,
}

const AppContext = createContext(initialState);
const { Provider } = AppContext;

export const AppProvider = (props) => {
  const reducer = (state, action) => {
    switch(action.type) {
      case APP_ACTIONS.SET_STATE:
        return { ...state, ...action.state };
      default: 
        return { ...state};
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Provider value={{ ...state, dispatch }}>{props.children}</Provider>
  )
}

export default AppContext;
