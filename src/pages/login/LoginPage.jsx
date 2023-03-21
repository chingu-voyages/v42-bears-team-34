import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginComponent } from '../../components/LoginComponent';
import AppContext from '../../context/AppContext';
import { ResponsiveParentContainer } from '../../components/ResponsiveParentContainer/ResponsiveParentContainer';
import { getUserProfile } from '../../services/get-user-profile/get-user-profile';
/**
 * Generic login page for use with admin or user
 * @returns JSX.Element
 */
function LoginPage(props) {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const { isAdmin, passwordResetMode } = props;
  const handleOnLoginSuccess = useCallback(() => {
    /* Handle log in. 
    Redirect the user to appropriate page on success depending on admin status
    */
    getUserProfile(dispatch, navigate, isAdmin);
  }, []);

  return (
    <ResponsiveParentContainer>
      <LoginComponent
        isAdmin={isAdmin}
        onLoginSuccess={handleOnLoginSuccess}
        passwordResetMode={passwordResetMode}
      />
    </ResponsiveParentContainer>
  );
}

export default LoginPage;
