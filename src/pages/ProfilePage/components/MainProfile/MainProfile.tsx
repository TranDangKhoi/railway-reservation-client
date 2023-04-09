import { Link } from "react-router-dom";
import { path } from "src/constants/path.enum";
import { ApplicationUserType } from "src/types/user.types";

type MainProfilePropsType = {
  containerClassName: string;
  userProfile: ApplicationUserType | null;
};

const MainProfile = ({ containerClassName, userProfile }: MainProfilePropsType) => {
  return (
    <div className={containerClassName}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Thông tin cá nhân</h2>
        {userProfile?.role === "admin" ? (
          <div className="flex items-center gap-x-2">
            <Link
              to={path.dashboardOrder}
              className="text-medium group w-max rounded-full border border-secondaryGray p-2 text-center transition-all hover:border-primary hover:bg-primary"
            >
              <span className="text-sm font-medium text-secondaryGray transition-all group-hover:text-white">
                Dashboard
              </span>
            </Link>
            <Link
              to={`${userProfile?.id}`}
              className="text-medium group w-max rounded-full border border-secondaryGray p-2 text-center transition-all hover:border-primary hover:bg-primary"
            >
              <span className="text-sm font-medium text-secondaryGray transition-all group-hover:text-white">
                Cập nhật thông tin
              </span>
            </Link>
          </div>
        ) : (
          <Link
            to={`${userProfile?.id}`}
            className="text-medium group w-max rounded-full border border-secondaryGray p-2 text-center transition-all hover:border-primary hover:bg-primary"
          >
            <span className="text-sm font-medium text-secondaryGray transition-all group-hover:text-white">
              Cập nhật thông tin
            </span>
          </Link>
        )}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-4">
        <div className="col-span-1">
          <div className="text-sm font-bold text-secondaryGray">Họ và tên</div>
          <div className="mt-2 flex h-[42px] items-center rounded-md border-2 border-primaryBorder bg-white px-2 py-5 font-medium text-[#3B3E44]">
            {userProfile?.fullname}
          </div>
        </div>
        <div className="col-span-1">
          <div className="text-sm font-bold text-secondaryGray">Số điện thoại</div>
          <div className="mt-2 flex h-[42px] items-center rounded-md border-2 border-primaryBorder bg-white px-2 py-5 font-medium text-[#3B3E44]">
            {userProfile?.phoneNumber ? userProfile.phoneNumber : "Chưa cập nhật số điện thoại"}
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-sm font-bold text-secondaryGray">Địa chỉ e-mail</div>
          <div className="mt-2 flex h-[42px] items-center rounded-md border-2 border-primaryBorder bg-white px-2 py-5 font-medium text-[#3B3E44]">
            {userProfile?.email}
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-sm font-bold text-secondaryGray">Địa chỉ nhà</div>
          <div className="mt-2 flex h-[42px] items-center rounded-md border-2 border-primaryBorder bg-white px-2 py-5 font-medium text-[#3B3E44]">
            {userProfile?.address ? userProfile.address : "Chưa cập nhật địa chỉ"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
