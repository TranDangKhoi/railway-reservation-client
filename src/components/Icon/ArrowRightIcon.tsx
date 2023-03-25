import React from "react";
import { IconType } from "src/types/icon.types";

const ArrowRightIcon = ({ width, height }: IconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.70811 7.00079L13.2981 7.00079L10.9981 9.29079C10.9049 9.38403 10.8309 9.49472 10.7805 9.61654C10.73 9.73836 10.704 9.86893 10.704 10.0008C10.704 10.1326 10.73 10.2632 10.7805 10.385C10.8309 10.5069 10.9049 10.6176 10.9981 10.7108C11.0913 10.804 11.202 10.878 11.3239 10.9285C11.4457 10.9789 11.5763 11.0049 11.7081 11.0049C11.84 11.0049 11.9705 10.9789 12.0924 10.9285C12.2142 10.878 12.3249 10.804 12.4181 10.7108L16.4181 6.71079C16.5092 6.61569 16.5805 6.50354 16.6281 6.38079C16.7281 6.13733 16.7281 5.86425 16.6281 5.62079C16.5805 5.49804 16.5092 5.38589 16.4181 5.29079L12.4181 1.29079C12.3251 1.19706 12.2145 1.12267 12.0927 1.0719C11.9708 1.02113 11.8401 0.994993 11.7081 0.994993C11.5761 0.994993 11.4454 1.02113 11.3235 1.0719C11.2017 1.12267 11.0911 1.19706 10.9981 1.29079C10.9044 1.38376 10.83 1.49435 10.7792 1.61621C10.7285 1.73807 10.7023 1.86878 10.7023 2.00079C10.7023 2.1328 10.7285 2.26351 10.7792 2.38537C10.83 2.50723 10.9044 2.61783 10.9981 2.71079L13.2981 5.00079L1.70811 5.00079C1.4429 5.00079 1.18854 5.10615 1.001 5.29368C0.813468 5.48122 0.708112 5.73557 0.708112 6.00079C0.708112 6.26601 0.813468 6.52036 1.001 6.7079C1.18854 6.89543 1.4429 7.00079 1.70811 7.00079Z"
        fill="#84878B"
      />
    </svg>
  );
};

export default ArrowRightIcon;