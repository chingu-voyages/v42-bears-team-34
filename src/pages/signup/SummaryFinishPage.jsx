import { Box, styled, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApplicationDetailsSectionComponent } from '../../components/ApplicationViewContainer/resources/ApplicationDetailsSectionComponent';
import { UserDetailsSectionComponent } from '../../components/ApplicationViewContainer/resources/UserDetailsSectionComponent';
import StyledButton from '../../components/StyledButton/StyledButton';
import AppContext from '../../context/AppContext';
import { UserClient } from '../../services/api-clients/user-client';
import { TokenManager } from '../../services/token-manager/token-manager';

const StyledSummaryBoxContainer = styled(Box)((props) => ({
  [props.theme.breakpoints.up('lg')]: {
    marginLeft: '20%',
    marginRight: '20%',
  },
}));
/**
 * Summary and thank you page after completing the application process
 * @param {*} props
 * @returns
 */
export function SummaryFinishPage(props) {
  const [userData, setUserData] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  // Grab the user applicationId.
  const { user, pendingApplicationId } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    // When this page loads, load the application we just entered and the user data
    const fetchApplicationData = async () => {
      const jwtToken = TokenManager.getToken();
      if (jwtToken) {
        if (user?.id && pendingApplicationId) {
          try {
            const userClient = new UserClient({ authToken: jwtToken });
            const applicationResponseData = await userClient.getApplicationById(
              pendingApplicationId
            );
            const userResponseData = await userClient.getUserById(
              TokenManager.parseToken(jwtToken).id
            );
            setUserData(userResponseData);
            setApplicationData(applicationResponseData);
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    fetchApplicationData();
  }, []);
  const handleFinish = () => {
    /* User clicks finish button and navigates to home page. Regardless, the application should be finished
       at this point */
    navigate('/', { replace: true });
  };
  return (
    <Box>
      <StyledSummaryBoxContainer>
        <Box component={'header'} mt={3}>
          <Typography variant="h3" textAlign={'center'}>
            Thank you for completing the application!
          </Typography>
          <Box mt={3}>
            <Typography variant="h5">
              Your application will be reviewed by a member of our team, and you
              will receive a response via e-mail within 24-48 business hours.
              You can also log in with the credentials you entered in this
              application to the{' '}
              <Link
                style={{ textDecoration: 'none', fontSize: '20px' }}
                to="/login"
              >
                USER PORTAL{' '}
              </Link>
              to check the status of your application. Below is a summary of
              your application.
            </Typography>
          </Box>
        </Box>
        <Box component={'div'}>
          {/* This holds the application summary */}
          {userData && <UserDetailsSectionComponent {...{ ...userData }} />}
          {applicationData && (
            <ApplicationDetailsSectionComponent {...{ ...applicationData }} />
          )}
        </Box>
        <Box display="flex" justifyContent={'center'} mt={3}>
          <StyledButton label="Finish" onClick={handleFinish} />
        </Box>
      </StyledSummaryBoxContainer>
    </Box>
  );
}
