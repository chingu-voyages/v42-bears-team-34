import { useState, useEffect } from 'react';
import { AuthClient } from '../services/api-clients/auth-client';

// This is a hook to check if an e-mail address is verified
export function useIsEmailVerified(email) {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  useEffect(() => {
    const checkEmailVerified = async () => {
      try {
        if (email) {
          const authClient = new AuthClient();
          const result = await authClient.getIsEmailVerified(email);
          setIsEmailVerified(result.value);
        }
      } catch (err) {
        console.error(err);
        setIsEmailVerified(false);
      }
    };
    checkEmailVerified();
  }, [email]);

  return [isEmailVerified];
}

export async function queryIsEmailVerified(email) {
  try {
    if (email) {
      const authClient = new AuthClient();
      const result = await authClient.getIsEmailVerified(email);
      return result.value
    }
    return false
  } catch (err) {
    console.error(err);
    return false;
  }
}