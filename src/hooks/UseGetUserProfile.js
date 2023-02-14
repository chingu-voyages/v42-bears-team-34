import { useState, useEffect } from "react";
import { UserClient } from "../services/api-clients/user-client";

const useGetUserProfile = (authToken) => {
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const getAuth = async() => {
      if (!authToken) {
        return;
      }
      const userClient = new UserClient({ authToken });
      const data = await userClient.getUserProfile();
      setUserProfile(data);
    }
    getAuth();
  },[authToken])

  return [userProfile];
}

export default useGetUserProfile;
