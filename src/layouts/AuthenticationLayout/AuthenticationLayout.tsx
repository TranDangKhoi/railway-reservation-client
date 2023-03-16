import React from "react";
import AuthenticationNavbar from "src/components/AuthenticationNavbar";
import Footer from "src/components/Footer";
type AuthenticationLayoutProps = {
  children: React.ReactNode;
};
const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return (
    <div>
      <AuthenticationNavbar></AuthenticationNavbar>
      <div className="relative h-full bg-homepageBackground bg-cover bg-center lg:h-[650px]">
        <div className="container bg-left-center lg:bg-logoBackground lg:bg-no-repeat">{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthenticationLayout;
