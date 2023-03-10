import React from "react";
import MainNavbar from "src/components/MainNavbar";

type MainLayoutType = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutType) => {
  return (
    <>
      <MainNavbar></MainNavbar>
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
