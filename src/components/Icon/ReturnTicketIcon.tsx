import React from "react";
import { IconType } from "src/types/icon.types";

const ReturnTicketIcon = ({ className, fill }: IconType) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx={12}
        cy={12}
        r={9}
        stroke={fill}
        strokeWidth={2}
      />
      <path
        d="M7.5 12H16.5"
        stroke={fill}
        strokeWidth={2}
      />
    </svg>
  );
};

export default ReturnTicketIcon;
