import { Navigate } from "react-router-dom";
import { SIGNUP_FLOW_RESULT_STATUS } from "../services/sign-up-helper/signup-flow-result-status";

/**
 * 
 * @param {Error} error 
 * @param {(boolean) => void} setModalOpenFunction React callback function
 * @param {({title: string, bodyText: string }) => void} setTitleFunction React callback function
 */
export function generateSignupError (error, setModalOpenFunction, setTitleFunction) {
  const parsedError = error.response?.data?.code;
  if (!parsedError) return;

  switch(parsedError) {
    case SIGNUP_FLOW_RESULT_STATUS.emailExists:
      setTitleFunction({ title: "Error", bodyText: "Please log into the user portal with your e-mail and credentials to continue this process." });
      setModalOpenFunction(true);
      break;
    case SIGNUP_FLOW_RESULT_STATUS.invalidUsernamePassword:
      setTitleFunction({ title: "Error", bodyText: "There was a problem with your credentials. Please use the user portal to sign-in or recover your credentials."});
      setModalOpenFunction(true);
      break;
    case SIGNUP_FLOW_RESULT_STATUS.pendingApplicationExists: 
      setTitleFunction({ title: "Error", bodyText: "There is already an application pending review associated with your profile. Please use the user portal to view the status of your application."})
      setModalOpenFunction(true);
      break;
    default:
      return;
  }
}
