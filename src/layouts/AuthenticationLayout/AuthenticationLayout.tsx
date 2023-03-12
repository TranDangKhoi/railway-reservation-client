import React from "react";
import AuthenticationNavbar from "src/components/AuthenticationNavbar";
type AuthenticationLayoutProps = {
  children: React.ReactNode;
};
const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return (
    <div>
      <AuthenticationNavbar></AuthenticationNavbar>
      <div className="h-full bg-white lg:h-[650px]">
        <div className="container bg-left-center lg:bg-logoBackground lg:bg-no-repeat">{children}</div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
