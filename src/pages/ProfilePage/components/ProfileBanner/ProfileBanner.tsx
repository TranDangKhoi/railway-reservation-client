import React from "react";
import { PenIcon } from "src/components/Icon";
import { ApplicationUserType } from "src/types/user.types";
import { displayEnGBDate } from "src/utils/formatDate";

type ProfileBannerPropsType = {
  containerClassName?: string;
  userProfile: ApplicationUserType | null;
};

const ProfileBanner = ({ containerClassName, userProfile }: ProfileBannerPropsType) => {
  return (
    <div className={containerClassName}>
      <div className="flex flex-col rounded-lg bg-white py-4 px-6 shadow-shadow3">
        <div className="relative h-40 w-40 self-center rounded-full">
          <img
            src={userProfile?.avatar}
            alt={userProfile?.fullname}
            className="h-full w-full rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-secondaryGray bg-tertiaryGray">
            <PenIcon
              className="h-4 w-4"
              fill="#777E90"
            ></PenIcon>
          </button>
        </div>
        <h3 className="mt-3 self-center text-2xl font-semibold">{userProfile?.fullname}</h3>
        <div className="flex items-center justify-between border-t-2 border-t-tertiaryGray pt-6">
          <span className="text-sm font-medium">Thành viên kể từ</span>
          {userProfile?.createdDate && (
            <p className="text-sm font-medium text-secondaryGray">{displayEnGBDate(userProfile.createdDate)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
