// context.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { lookInSession } from '../common/session';

interface UserContextProviderProps {
  children: React.ReactNode;
}


export const UserContext = createContext<any>(null);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userAuth, setUserAuth] = useState<any>({ data: { access_token: null } });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let userInSession = lookInSession("user");
      userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ data: { access_token: null } });
    }
  }, [])

  return <UserContext.Provider value={{ userAuth, setUserAuth }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

//--------------------------------------------
