import React from "react";
import { useMatch } from "react-router-dom";
import AuthenticationNavbar from "src/components/AuthenticationNavbar";
import { path } from "src/constants/path.enum";
type AuthenticationLayoutProps = {
  children: React.ReactNode;
};
const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  const matchLogin = useMatch(path.login);
  const isMatchLogin = Boolean(matchLogin);
  return (
    <div>
      <AuthenticationNavbar></AuthenticationNavbar>
      <div className="relative h-full bg-primary bg-center lg:h-[650px]">
        <div className="container bg-left-center lg:bg-logoBackground lg:bg-no-repeat">{children}</div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
