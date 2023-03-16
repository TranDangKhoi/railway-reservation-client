import React from "react";
import Footer from "src/components/Footer";
import MainNavbar from "src/components/MainNavbar";

type MainLayoutType = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutType) => {
  return (
    <>
      <MainNavbar></MainNavbar>
      <div>{children}</div>
      <div className="mt-52"></div>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
