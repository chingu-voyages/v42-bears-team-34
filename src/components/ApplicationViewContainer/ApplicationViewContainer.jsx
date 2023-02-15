import { Box, styled } from "@mui/material";
import { useState, useContext, useEffect  } from "react";
import AppContext from "../../context/AppContext";
import { AdminClient } from "../../services/api-clients/admin-client";
import { UserClient } from "../../services/api-clients/user-client";
import { TokenManager } from "../../services/token-manager/token-manager";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDetailsSectionComponent } from "./resources/UserDetailsSectionComponent";
import { ApplicationDetailsSectionComponent } from "./resources/ApplicationDetailsSectionComponent";
import { NoInformationFound } from "./resources/NoInformationFoundComponent";
import { AdminControlsComponent } from "./resources/AdminControlsComponent";
import { FinancialDetailsContainerComponent } from "./resources/financial-details";
import { PALLET } from "../../stylings/pallet";
import { useCallback } from "react";
import { RejectReasonDialog } from "./resources/admin/rejected-reason-dialog/RejectReasonDialog";


const StyledMainBlock = styled(Box)((props) => ({
  borderRadius: "2px",
  opacity: 0.9,
  [props.theme.breakpoints.up("lg")]: {
    marginLeft: "20%",
    marginRight: "20%"
  }
}))
/**
 * Specific application view that shows a specific user's details accompanied by the specific application by applicationId
 * @returns 
 */
export function ApplicationViewContainer () {
  const { id } = useParams(); // extract the applicationID from params
  const { user } = useContext(AppContext);

  const [applicationData, setApplicationData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [isLoadingFinancialData, setIsLoadingFinancialData] = useState(false);
  const [financialDataError, setFinancialDataError] = useState({ error: false, message: "" });
  const [adminControlsDisabled, setAdminControlsDisabled] = useState(false);
  const [approveButtonDisabled, setApproveButtonDisabled] = useState(false);
  const [rejectButtonDisabled, setRejectButtonDisabled] = useState(false);
  const [fetchFinancialDetailsButtonDisabled, setFetchFinancialDetailsButtonDisabled] = useState(false);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const navigate = useNavigate();
  // When the page loads, do the fetching of the data
  useEffect(() => {
    const fetchApplicationById = async() => {
      try {
        const jwtToken = TokenManager.getToken();
        if (user && user.role === "admin") {
          await fetchApplicationAndUserDataAdmin();
        } else if (user && user.role === "user") {
          await fetchApplicationAndUserDataUser();
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchApplicationById();
  },[user]);

  const fetchApplicationAndUserDataAdmin = async() => {
    const jwtToken = TokenManager.getToken();
    const adminClient = new AdminClient({ authToken: jwtToken });
    const applicationResponseData = await adminClient.adminGetApplicationById(id);
    setApplicationData(applicationResponseData);

    // We should have access to the requestedBy property on the application
    // which we can use to fetch the user data

    const userResponseData = await adminClient.adminGetUserById(applicationResponseData.requestedBy);
    setUserData(userResponseData);
  }

  const fetchApplicationAndUserDataUser = async() => {
    const jwtToken = TokenManager.getToken();
    const userClient = new UserClient({ authToken: jwtToken });
    const userApplicationData = await userClient.getApplicationById(id);
    setApplicationData(userApplicationData);
    // Get the user from this data
    const userResponseData = await userClient.getUserById(userApplicationData.requestedBy)
    setUserData(userResponseData);
  }

  const handleFetchFinancialData = async () => {
    // Here we fetch data from our API, which connects to plaid for financial
    const authToken = TokenManager.getToken();
    const adminClient = new AdminClient({ authToken });
    try {
      setIsLoadingFinancialData(true);
      const liabilitiesData = await adminClient.getFinancialLiabilitiesByUserID(applicationData.requestedBy);
      setFinancialData(liabilitiesData.data);
      setIsLoadingFinancialData(false);
    } catch (error) {
      setIsLoadingFinancialData(false);
    }
  }

  const backNavigationTargetUrl = user && user.role === "admin" ? `/admin/applications` : `/user/applications`
  useEffect(() => {
    setAdminControlsDisabled(determineAdminControlStatus());
    setFetchFinancialDetailsButtonDisabled(determineFetchFinancialDetailsStatus());

  },[userData, applicationData]);

  const determineAdminControlStatus = () => {
    if (!userData) return true;
    if (!applicationData) return true;
    
    // Disable approve and reject buttons if the status is not "pending"
    if (applicationData.status !== "pending") return true;
    return false;
  }

  const determineFetchFinancialDetailsStatus = () => {
    // We'll still enable the financial details fetch button even if the application status is not pending
    if (!userData) return true;
    if (!applicationData) return true;
    return false;
  }
  const handleOpenRejectDialog = () => {
    // Opens the rejection reason dialog box so admin can enter a reason
    setRejectDialogOpen(true);
  }

  const handleConfirmRejectApplication = async (reason) => {
    // Send a request to reject this application
    const jwtToken = TokenManager.getToken();
    if (jwtToken) {
      try {
        const adminClient = new AdminClient({ authToken: jwtToken});
        await adminClient.rejectApplication(id, reason); // from params
        setRejectDialogOpen(false);
        // Re-fetch the data after this is done
        await fetchApplicationAndUserDataAdmin();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleConfirmApproveApplication = async () => {
    // Send a request to approve this application
    const jwtToken = TokenManager.getToken();
    if (jwtToken) {
      try {
        const adminClient = new AdminClient({ authToken: jwtToken});
        await adminClient.approveApplication(id); // from params
        // Re-fetch the data after this is done
        await fetchApplicationAndUserDataAdmin();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <StyledMainBlock mt={3} bgcolor={PALLET.applicationDetails.backgroundColor}>
      <Box>
        {/* Navigation controls. Allow user to navigate back to the appropriate landing page */}
        <Link style={{ textDecoration: "none", fontSize: "1.2rem", fontFamily: "inherit", padding: "5px"}} to={backNavigationTargetUrl}> Go Back</Link>  
      </Box>
      <Box>
        <Box mt={3}>
          { userData ? (
            <UserDetailsSectionComponent {...{...userData}} />
          ) : <NoInformationFound title="No user information found for this application" /> }
        </Box>
        <Box>
          {/* Second section for the application details */}
          { applicationData ? (
            <ApplicationDetailsSectionComponent {...{...applicationData}} />
          ) : 
          (<Box><NoInformationFound title={"No application information found"} /></Box>
          )}
        </Box>
        <Box>
          {/* Third section for financial data (if admin) */}
          <FinancialDetailsContainerComponent isLoading={isLoadingFinancialData} data={financialData} />
        </Box>
        <Box>
          { user && user.role && user.role === "admin" && (
            <AdminControlsComponent 
              onFetchFinancialDataClick={handleFetchFinancialData} 
              onApproveClick={handleConfirmApproveApplication}
              onRejectClick={handleOpenRejectDialog}
              fetchButtonDisabled={fetchFinancialDetailsButtonDisabled}
              approveButtonDisabled={adminControlsDisabled || approveButtonDisabled}
              rejectButtonDisabled={adminControlsDisabled || rejectButtonDisabled}
              />
          )}
        </Box>
      </Box>
      <RejectReasonDialog open={rejectDialogOpen} onClose={()=> setRejectDialogOpen(false)} onConfirmReject={handleConfirmRejectApplication} />
    </StyledMainBlock>
  )
}
