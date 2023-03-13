import React, { createContext, useState } from "react";
import { ApplicationUserType } from "src/types/user.types";
import { getAccessTokenFromLS, getProfileFromLS } from "src/utils/auth";

interface AuthContextInterface {
  isAuthenticated: boolean;
  userProfile: ApplicationUserType | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<ApplicationUserType | null>>;
}

const initialAuthContext: AuthContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  userProfile: getProfileFromLS() || null,
  setIsAuthenticated: () => null,
  setUserProfile: () => null,
};

export const AuthContext = createContext<AuthContextInterface>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated);
  const [userProfile, setUserProfile] = useState<ApplicationUserType | null>(initialAuthContext.userProfile);
  return (
    <AuthContext.Provider value={{ userProfile, isAuthenticated, setIsAuthenticated, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
