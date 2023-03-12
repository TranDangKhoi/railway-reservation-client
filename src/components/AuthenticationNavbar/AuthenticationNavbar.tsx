import React from "react";
import { Link } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { LogoIcon } from "../Icon";
const AuthenticationNavbar = () => {
  return (
    <div className="bg-primary px-2 py-5">
      <div className="layout-container">
        <nav className="flex items-center">
          <Link
            to={path.homepage}
            className="flex items-center gap-x-2"
          >
            <LogoIcon
              width={28}
              height={27}
              kind="secondary"
            ></LogoIcon>
            <span className="text-lg font-bold">Railway</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AuthenticationNavbar;
