import { useContext } from "react";
import Breadcrumb from "src/components/Breadcrumb";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import MainProfile from "./components/MainProfile";
import ProfileBanner from "./components/ProfileBanner";

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
      <div className="mt-10 grid grid-cols-3 gap-x-8">
        <ProfileBanner
          userProfile={userProfile}
          containerClassName="col-span-1"
        ></ProfileBanner>
        <MainProfile
          containerClassName="col-span-2"
          userProfile={userProfile}
        ></MainProfile>
      </div>
    </div>
  );
};

export default ProfilePage;
