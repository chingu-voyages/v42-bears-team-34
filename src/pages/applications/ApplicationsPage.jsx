import React, { useEffect, useState, useCallback, useContext } from 'react';
import { TokenManager } from '../../services/token-manager/token-manager';
import { AdminClient } from '../../services/api-clients/admin-client';
import { Box } from '@mui/system';
import { ApplicationsList } from '../admin/applications-list/ApplicationsList';
import { styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { UserClient } from '../../services/api-clients/user-client';
import { FullPageSpinner } from '../../components/Spinner/FullPageSpinner';

const StyledApplicationsPageContainer = styled(Box)((props) => ({
  marginTop: '20px',
  [props.theme.breakpoints.up('lg')]: {
    marginLeft: '15%',
    marginRight: '15%',
  },
}));
// This page renders a list of applications
// Clicking on one of these summaries should bring you to a detailed page
function ApplicationsPage() {
  const [userApplications, setUserApplications] = useState([]);
  const { user } = useContext(AppContext);
  const [isBusy, setIsBusy] = useState(false);
  const navigate = useNavigate();

  // Load applications when the page loads.
  useEffect(() => {
    if (user && user.role === 'admin') {
      const doAdminFetchApplications = async () => {
        await adminFetchAllApplications();
      };
      doAdminFetchApplications();
    } else if (user && user.role === 'user') {
      const doUserFetchApplications = async () => {
        await userFetchApplications();
      };
      doUserFetchApplications();
    }
  }, [user]);

  const adminFetchAllApplications = async () => {
    // Get all applications and then the associated user
    const jwtToken = TokenManager.getToken();
    if (jwtToken) {
      try {
        setIsBusy(true);
        const adminClient = new AdminClient({ authToken: jwtToken });
        const data = await adminClient.adminGetAllApplications();

        if (data.applications) {
          const userData = await Promise.allSettled(
            data.applications.map((app) =>
              adminClient.adminGetUserById(app.requestedBy)
            )
          );
          const groupedData = groupApplicationsAndUsers(
            userData,
            data.applications
          );
          setUserApplications(groupedData);
        }
        setIsBusy(false);
      } catch (error) {
        console.log(error);
        setIsBusy(false);
      }
    }
  };

  const userFetchApplications = async () => {
    const jwtToken = TokenManager.getToken();
    // Grab user's own applications if any
    if (jwtToken) {
      try {
        setIsBusy(true);
        const userClient = new UserClient({ authToken: jwtToken });
        const applicationsData = await userClient.getApplications();
        const { id } = TokenManager.parseToken(jwtToken);
        const usersOwnData = await userClient.getUserById(id);
        const groupedData = groupApplicationsAndUsers(
          [{ value: usersOwnData }],
          applicationsData
        );
        setUserApplications(groupedData);
        setIsBusy(false);
      } catch (error) {
        console.log(error);
        setIsBusy(false);
      }
    }
  };
  const handleApplicationClicked = useCallback((id) => {
    // Programmatically navigate to application view
    if (user && user.role === 'admin') {
      navigate(`/admin/applications/view/${id}`);
    } else if (user && user.role === 'user') {
      navigate(`/user/applications/view/${id}`);
    }
  });

  return (
    <>
      {isBusy && <FullPageSpinner />}
      <Typography mt={3} variant="h3" textAlign={'center'}>
        Applications
      </Typography>
      <StyledApplicationsPageContainer>
        <ApplicationsList
          userApplications={userApplications}
          onApplicationClicked={handleApplicationClicked}
        />
      </StyledApplicationsPageContainer>
    </>
  );
}

const groupApplicationsAndUsers = (userData, applications) => {
  return applications.map((application) => {
    const specificUser = userData.find(
      (u) => u.value && u.value.id === application.requestedBy
    );
    return {
      application,
      user: (specificUser && specificUser.value) || null,
    };
  });
};
export default ApplicationsPage;
