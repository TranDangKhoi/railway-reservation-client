import React from "react";
import { Link, useMatch } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { LogoIcon } from "../Icon";
const AuthenticationNavbar = () => {
  const matchLogin = useMatch(path.login);
  const isMatchLogin = Boolean(matchLogin);
  return (
    <div className="bg-white px-2 py-5">
      <div className="layout-container">
        <nav className="flex items-center">
          <Link
            to={path.homepage}
            className="flex items-center gap-x-2"
          >
            <LogoIcon
              width={31}
              height={29}
              kind="primary"
            ></LogoIcon>
            <span className="text-lg font-bold text-primary">{isMatchLogin ? "Đăng nhập" : "Đăng ký"}</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AuthenticationNavbar;
