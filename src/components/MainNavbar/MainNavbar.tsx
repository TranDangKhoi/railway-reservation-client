import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "src/apis/auth.api";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import { ArrowDownIcon, LogoIcon } from "../Icon";
import Popover from "../Popover";
const MainNavbar = () => {
  const { isAuthenticated, userProfile, setIsAuthenticated, setUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOutAccountMutation = useMutation({
    mutationFn: () => authApi.logoutAccount(),
  });
  const handleLogout = () => {
    navigate(path.login);
    logOutAccountMutation.mutate();
    setIsAuthenticated(false);
    setUserProfile(null);
    toast.success("Đăng xuất thành công");
  };
  return (
    <div className="bg-primaryGray px-2 py-5">
      <div className="layout-container">
        <nav className="flex items-center justify-between">
          <div
            className="flex cursor-pointer items-center gap-x-2"
            onClick={() => navigate(path.homepage)}
            aria-hidden={true}
          >
            <LogoIcon
              width={31}
              height={29}
              kind="primary"
            ></LogoIcon>
            <span className="text-lg font-bold">Railway</span>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2 border border-l-transparent border-t-transparent border-b-transparent border-r-[#D9D9D9] pr-2">
              <span>EN</span>
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/255px-Flag_of_the_United_States.svg.png"
                  alt=""
                  className="h-6 w-6 rounded-full object-cover"
                />
              </div>
            </div>
            {isAuthenticated ? (
              <Popover
                placement="bottom"
                renderPopover={
                  <div className="overflow-hidden rounded-lg bg-white text-center shadow-shadow1">
                    <div className="flex flex-col">
                      <Link
                        to={path.profile}
                        className="px-10 py-1 text-base hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                      >
                        Thông tin cá nhân
                      </Link>
                      <Link
                        to={path.orders}
                        className="px-10 py-1 text-base hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                      >
                        Đơn mua
                      </Link>
                      <div
                        className="cursor-pointer px-10 py-1 text-base hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                        onClick={handleLogout}
                        aria-hidden={true}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="flex items-center gap-x-2">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                    <img
                      src={userProfile?.avatar}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{userProfile?.fullname}</span>
                  <ArrowDownIcon
                    kind="secondary"
                    width={10}
                    height={10}
                  ></ArrowDownIcon>
                </div>
              </Popover>
            ) : (
              <Popover
                initialOpen={false}
                renderPopover={
                  <div className="overflow-hidden rounded-lg bg-white text-center shadow-shadow1">
                    <div className="flex flex-col">
                      <Link
                        to={path.register}
                        className="px-10 py-1 text-base hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                      >
                        Đăng ký
                      </Link>
                      <Link
                        to={path.login}
                        className="px-10 py-1 text-base hover:bg-primary hover:bg-opacity-10 hover:text-primary"
                      >
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                }
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-disabled">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6831 11.2445C15.6684 10.4736 16.3875 9.41645 16.7405 8.22016C17.0935 7.02387 17.0628 5.74791 16.6526 4.56979C16.2425 3.39167 15.4733 2.36999 14.4521 1.64687C13.4309 0.923747 12.2084 0.535156 10.9548 0.535156C9.70121 0.535156 8.47877 0.923747 7.45757 1.64687C6.43637 2.36999 5.66718 3.39167 5.25704 4.56979C4.84689 5.74791 4.81617 7.02387 5.16915 8.22016C5.52214 9.41645 6.24127 10.4736 7.2265 11.2445C5.53828 11.9171 4.06526 13.0328 2.96445 14.4725C1.86365 15.9123 1.17634 17.6221 0.975788 19.4198C0.961271 19.551 0.97289 19.6838 1.00998 19.8106C1.04707 19.9374 1.10891 20.0556 1.19196 20.1587C1.35969 20.3667 1.60366 20.5 1.87018 20.5291C2.13671 20.5583 2.40397 20.4809 2.61316 20.3141C2.82235 20.1473 2.95635 19.9047 2.98566 19.6396C3.20633 17.686 4.14304 15.8816 5.61681 14.5714C7.09059 13.2611 8.99811 12.5368 10.9749 12.5368C12.9517 12.5368 14.8593 13.2611 16.333 14.5714C17.8068 15.8816 18.7435 17.686 18.9642 19.6396C18.9915 19.8852 19.1093 20.112 19.2949 20.2763C19.4805 20.4405 19.7207 20.5306 19.9691 20.5291H20.0797C20.3431 20.499 20.5839 20.3665 20.7495 20.1606C20.9152 19.9547 20.9923 19.692 20.964 19.4298C20.7625 17.627 20.0715 15.9128 18.965 14.4708C17.8586 13.0289 16.3784 11.9136 14.6831 11.2445ZM10.9548 10.5349C10.1598 10.5349 9.38261 10.3004 8.72157 9.86115C8.06052 9.42188 7.5453 8.79753 7.24106 8.06704C6.93681 7.33656 6.8572 6.53276 7.01231 5.75728C7.16741 4.9818 7.55026 4.26948 8.11243 3.71039C8.6746 3.15131 9.39085 2.77056 10.1706 2.61631C10.9504 2.46206 11.7586 2.54123 12.4931 2.8438C13.2276 3.14638 13.8554 3.65877 14.2971 4.31619C14.7388 4.97361 14.9746 5.74652 14.9746 6.53719C14.9746 7.59745 14.5511 8.61428 13.7972 9.36399C13.0434 10.1137 12.0209 10.5349 10.9548 10.5349Z"
                      fill="#3B3E44"
                    />
                  </svg>
                </div>
              </Popover>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainNavbar;
