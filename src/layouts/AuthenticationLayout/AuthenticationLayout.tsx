import classNames from "classnames";
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
      <div className="relative h-full bg-randomBackground bg-center lg:h-[650px]">
        <div className="container bg-left-center lg:bg-logoBackground lg:bg-no-repeat">{children}</div>
        <h2
          className={classNames(
            "absolute  text-6xl font-bold",
            {
              "top-[410px] left-64": isMatchLogin,
            },
            {
              "top-[460px] left-64": !isMatchLogin,
            },
          )}
        >
          Railway
        </h2>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
