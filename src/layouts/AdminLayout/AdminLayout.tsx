import React from "react";
import Footer from "src/components/Footer";
import MainNavbar from "src/components/MainNavbar";

type AdminLayoutPropsType = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutPropsType) => {
  return (
    <>
      <MainNavbar></MainNavbar>
      <div className="grid grid-cols-4 gap-x-5">
        <div className="col-span-1">
          <div className="flex h-full w-[320px] flex-col bg-white shadow-shadow3"></div>
        </div>
        <div className="col-span-3">{children}</div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AdminLayout;
