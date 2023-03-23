import React from "react";
import { IconType } from "src/types/icon.types";

const LocationIcon = ({ width = 17, height = 20 }: IconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5442 15.386C15.9447 13.437 16.9021 11.2949 16.9021 9.12679C16.9021 5.25169 13.7688 2.1103 9.90372 2.1103C6.03861 2.1103 2.90531 5.25169 2.90531 9.12679C2.90531 11.2949 3.86278 13.437 5.26324 15.386C6.65314 17.3202 8.36222 18.9 9.58068 19.9006C9.78056 20.0647 10.0269 20.0647 10.2268 19.9006C11.4452 18.9 13.1543 17.3202 14.5442 15.386ZM11.4938 21.4515C14.0774 19.3299 18.9017 14.6314 18.9017 9.12679C18.9017 4.14452 14.8732 0.105591 9.90372 0.105591C4.93429 0.105591 0.905762 4.14452 0.905762 9.12679C0.905762 14.6314 5.73004 19.3299 8.31369 21.4515C9.25043 22.2207 10.557 22.2207 11.4938 21.4515Z"
        fill="#B1B5C4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.90388 7.12189C8.79956 7.12189 7.90434 8.01942 7.90434 9.12659C7.90434 10.2338 8.79956 11.1313 9.90388 11.1313C11.0082 11.1313 11.9034 10.2338 11.9034 9.12659C11.9034 8.01942 11.0082 7.12189 9.90388 7.12189ZM5.90479 9.12659C5.90479 6.91226 7.69524 5.11719 9.90388 5.11719C12.1125 5.11719 13.903 6.91226 13.903 9.12659C13.903 11.3409 12.1125 13.136 9.90388 13.136C7.69524 13.136 5.90479 11.3409 5.90479 9.12659Z"
        fill="#B1B5C4"
      />
    </svg>
  );
};

export default LocationIcon;