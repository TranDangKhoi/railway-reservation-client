import { useQuery } from "@tanstack/react-query";
import React from "react";
import orderApi from "src/apis/order.api";
import { PenIcon } from "src/components/Icon";
import { ApplicationUserType } from "src/types/user.types";
import { displayEnGBDate } from "src/utils/formatDate";

type ProfileBannerPropsType = {
  containerClassName?: string;
  userProfile: ApplicationUserType | null;
};

const ProfileBanner = ({ containerClassName, userProfile }: ProfileBannerPropsType) => {
  const { data: orderData, isLoading: orderIsLoading } = useQuery({
    queryKey: ["orders", { userId: userProfile?.id as string }],
    queryFn: () => orderApi.getAllOrdersByUserId(userProfile?.id as string),
  });
  const order = orderData?.data.data;
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
          <span className="text-sm font-medium">Số lượng đơn hàng đã đặt</span>
          {order ? (
            <p className="text-sm font-medium text-secondaryGray">{order.length}</p>
          ) : (
            <div className="flex items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-6">
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
