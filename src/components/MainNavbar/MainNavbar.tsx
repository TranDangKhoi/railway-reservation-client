import Logo from "src/assets/images/Logo.png";
import Avatar from "src/assets/images/Avatar.png";
const MainNavbar = () => {
  return (
    <div className="bg-white px-2 py-3">
      <div className="layout-container">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <img
              src={Logo}
              alt="Logo"
            />
            <span className="text-lg font-bold">Railway</span>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2 border border-l-transparent border-t-transparent border-b-transparent border-r-[#D9D9D9] pr-2">
              <span>USD</span>
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/255px-Flag_of_the_United_States.svg.png"
                  alt=""
                  className="h-6 w-6 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                <img
                  src={Avatar}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="font-medium">Delowar</span>
              <svg
                width={25}
                height={18}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.93248 0C9.3564 0 9.58798 0.494429 9.31659 0.820092L5.38411 5.53907C5.18421 5.77894 4.81579 5.77894 4.61589 5.53907L0.683409 0.820091C0.412023 0.494428 0.643602 0 1.06752 0L8.93248 0Z"
                  fill="#3B3E44"
                />
              </svg>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MainNavbar;
