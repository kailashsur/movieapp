// context.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { lookInSession } from '../common/session';

// Create the UserContext
export const UserContext = createContext<any>(null);

// UserContext Provider component
export const UserContextProvider: React.FC = ({ children }) => {
  // Define state or any context-related logic here
  const [userAuth, setUserAuth] = useState<any>({ data: { access_token: null } });

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      let userInSession = lookInSession("user");
      userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ data: { access_token: null } });
    }
  }, [])

  return <UserContext.Provider value={{ userAuth, setUserAuth }}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);
