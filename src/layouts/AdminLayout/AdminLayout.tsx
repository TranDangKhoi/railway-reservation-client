import React from "react";
import { Link, NavLink } from "react-router-dom";
import Footer from "src/components/Footer";
import MainNavbar from "src/components/MainNavbar";
import { path } from "src/constants/path.enum";

type AdminLayoutPropsType = {
  children?: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutPropsType) => {
  return (
    <>
      <MainNavbar></MainNavbar>
      <div className="grid grid-cols-4 gap-x-3">
        <div className="col-span-1">
          <div className="flex h-[700px] w-full flex-col bg-white shadow-shadow3">
            <NavLink
              to={path.dashboardOrder}
              className={({ isActive }) =>
                `py-3 px-4 text-sm hover:bg-gray-200 hover:text-black ${
                  isActive ? "bg-gray-300 text-black" : "bg-white text-secondaryGray"
                }`
              }
            >
              Quản lí đơn hàng
            </NavLink>
            <NavLink
              to={path.dashboardUser}
              className={({ isActive }) =>
                `py-3 px-4 text-sm hover:bg-gray-200 hover:text-black ${
                  isActive ? "bg-gray-300 text-black" : "bg-white text-secondaryGray"
                }`
              }
            >
              Quản lí người dùng
            </NavLink>
            <Link
              to="/dashboard/orders"
              className="py-3 px-4 text-sm text-secondaryGray hover:bg-gray-300"
            >
              Quản lí chuyến đi
            </Link>
          </div>
        </div>
        <div className="col-span-3">{children}</div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AdminLayout;
