import React, { useContext } from "react";
import Breadcrumb from "src/components/Breadcrumb";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";

type ProfilePagePropsType = {
  something: string;
};

const ProfilePage = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <div className="container mt-10">
      <Breadcrumb
        firstText="Trang chủ"
        firstLink={path.homepage}
        secondText="Thông tin cá nhân"
        secondLink={path.profile}
      ></Breadcrumb>
      <div className="mt-10 grid grid-cols-3">
        <div className="col-span-1">
          <div className="h-32 w-32 overflow-hidden rounded-full">
            <img
              src={userProfile?.avatar}
              alt={userProfile?.fullname}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
