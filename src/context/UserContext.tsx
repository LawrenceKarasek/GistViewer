import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userNameContext: string | undefined;
  setUserNameContext: (userNameContext: string) => void;
}

const UserContextObj = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userNameContext, setUserNameContext] = useState<string | undefined>(undefined);

  return <UserContextObj.Provider value={{ userNameContext, setUserNameContext }}>{children}</UserContextObj.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContextObj);
  if (!context) {
    throw new Error('useContext must be used within a UserProvider');
  }
  return context;
};
