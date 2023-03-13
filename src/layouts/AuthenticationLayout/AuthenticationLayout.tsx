import React from "react";
import AuthenticationNavbar from "src/components/AuthenticationNavbar";
type AuthenticationLayoutProps = {
  children: React.ReactNode;
};
const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return (
    <div>
      <AuthenticationNavbar></AuthenticationNavbar>
      <div className="relative h-full bg-randomBackground bg-center lg:h-[650px]">
        <div className="container bg-left-center lg:bg-logoBackground lg:bg-no-repeat">{children}</div>
        <h2 className="absolute top-[450px] left-36 text-6xl font-bold">Railway</h2>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
