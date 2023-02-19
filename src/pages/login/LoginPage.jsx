import { Box, styled } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginComponent } from '../../components/LoginComponent';
import { APP_ACTIONS } from '../../context/app.actions';
import AppContext from '../../context/AppContext';
import { UserClient } from '../../services/api-clients/user-client';
import { TokenManager } from '../../services/token-manager/token-manager';

const ResponsiveParentContainer = styled(Box)((props) => ({
  marginTop: '50px',
  [props.theme.breakpoints.up('md')]: {
    marginTop: '200px',
    marginLeft: '5rem',
    marginRight: '5rem',
  },
  [props.theme.breakpoints.up('lg')]: {
    marginLeft: '30vw',
    marginRight: '30vw',
  },
}));
/**
 * Generic login page for use with admin or user
 * @returns JSX.Element
 */
function LoginPage(props) {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const handleOnLoginSuccess = useCallback(() => {
    /* Handle log in. 
    The token should be written at the LoginComponent level
    Redirect the user to appropriate page on success depending on admin status
    */

    const getUserProfile = async () => {
      try {
        const authToken = TokenManager.getToken();
        const userClient = new UserClient({ authToken });
        const userProfile = await userClient.getUserProfile();
        if (userProfile) {
          const { id, firstName, lastName, role, iat, exp, expired } =
            userProfile;
          // Update state
          dispatch({
            type: APP_ACTIONS.SET_STATE,
            state: {
              isAuthenticated: true,
              user: {
                id,
                firstName,
                lastName,
                role,
                iat,
                exp,
                expired,
              },
            },
          });
          // If the user's role is admin, redirect them to admin landing page
          if (role === 'admin' && props.isAdmin) {
            navigate('/admin/applications', { replace: true });
          } else {
            /* Direct them to normal user landing page 
          where user can view their pending application and status
          */
            navigate(`/user/applications`, { replace: true });
          }
        }
      } catch (exception) {
        // If there's some error. Update state.
        console.error(exception);
        dispatch({
          type: APP_ACTIONS.SET_STATE,
          state: {
            isAuthenticated: false,
            user: {
              id: null,
              firstName: null,
              lastName: null,
              email: null,
              role: 'user',
            },
          },
        });
      }
    };
    getUserProfile();
  }, []);

  return (
    <ResponsiveParentContainer>
      <LoginComponent
        isAdmin={props.isAdmin}
        onLoginSuccess={handleOnLoginSuccess}
      />
    </ResponsiveParentContainer>
  );
}

export default LoginPage;
