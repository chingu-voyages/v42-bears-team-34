import { Box, styled } from "@mui/material";
import { useState, useContext, useEffect  } from "react";
import AppContext from "../../context/AppContext";
import { AdminClient } from "../../services/api-clients/admin-client";
import { UserClient } from "../../services/api-clients/user-client";
import { TokenManager } from "../../services/token-manager/token-manager";
import { useParams } from "react-router-dom";
import { UserDetailsSectionComponent } from "./resources/UserDetailsSectionComponent";
import { ApplicationDetailsSectionComponent } from "./resources/ApplicationDetailsSectionComponent";
import { NoInformationFound } from "./resources/NoInformationFoundComponent";
import { AdminControlsComponent } from "./resources/AdminControlsComponent";
import { FinancialDetailsContainerComponent } from "./resources/financial-details";
import { PALLET } from "../../stylings/pallet";


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
  const [financialDataError, setFinancialDataError] = useState({ error: false, message: "" })
  // When the page loads, do the fetching of the data
  useEffect(() => {
    const fetchApplicationById = async() => {
      try {
        const jwtToken = TokenManager.getToken();
        if (user && user.role === "admin") {
          await fetchApplicationAndUserDataAdmin(jwtToken);
        } else if (user && user.role === "user") {
          await fetchApplicationAndUserDataUser(jwtToken);
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchApplicationById();
  },[user]);

  const fetchApplicationAndUserDataAdmin = async(jwtToken) => {
    const adminClient = new AdminClient({ authToken: jwtToken });
    const applicationResponseData = await adminClient.adminGetApplicationById(id);
    setApplicationData(applicationResponseData);

    // We should have access to the requestedBy property on the application
    // which we can use to fetch the user data

    const userResponseData = await adminClient.adminGetUserById(applicationResponseData.requestedBy);
    setUserData(userResponseData);
  }

  const fetchApplicationAndUserDataUser = async(jwtToken) => {
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
      console.log(liabilitiesData);
      setFinancialData(liabilitiesData.data);
      setIsLoadingFinancialData(false);
    } catch (error) {
      console.error("79 financialData", error);
      setIsLoadingFinancialData(false);
    }
  }
  return (
    <StyledMainBlock mt={3} bgcolor={PALLET.applicationDetails.backgroundColor}>
      <Box>
        <Box>
          { userData ? (
            <UserDetailsSectionComponent {...{...userData}} />
          ) : <NoInformationFound title="No user information found for this application" /> }
        </Box>
        <Box>
          {/* Second section for the application details */}
          { applicationData ? (
            <ApplicationDetailsSectionComponent {...{...applicationData}} />
          ) : <NoInformationFound title={"No application information found"} />}
        </Box>
        <Box>
          {/* Third section for financial data (if admin) */}
          <FinancialDetailsContainerComponent isLoading={isLoadingFinancialData} data={financialData} />
        </Box>
        <Box>
          { user && user.role && user.role === "admin" && (
            <AdminControlsComponent 
              onFetchFinancialDataClick={handleFetchFinancialData} 
              onApproveClick={()=> {}}
              onRejectClick={()=> {}}
              />
          )}
        </Box>
      </Box>
    </StyledMainBlock>
  )
}
