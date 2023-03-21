import { APP_ACTIONS } from '../../context/app.actions';
import { TokenManager } from '../token-manager/token-manager';
import { UserClient } from '../api-clients/user-client';

/**
 *
 * @param {*} dispatch React dispatch hook gets passed here
 * @param {*} navigate React-router navigate hook gets passed here
 * @param {boolean} isAdmin
 */
export async function getUserProfile(dispatch, navigate, isAdmin) {
  try {
    const authToken = TokenManager.getToken();
    const userClient = new UserClient({ authToken });
    const userProfile = await userClient.getUserProfile();
    if (userProfile) {
      const { id, firstName, lastName, role, iat, exp, expired } = userProfile;
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
      if (role === 'admin' && isAdmin) {
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
}
