import React from "react";
import { IconType } from "src/types/icon.types";

const ShieldIcon = ({ className, fill }: IconType) => {
  return (
    <svg
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.2899 1.77045C16.1711 1.67645 16.0322 1.60968 15.8836 1.57506C15.7349 1.54043 15.5802 1.53884 15.4308 1.57039C14.338 1.7944 13.2098 1.79726 12.1158 1.57878C11.0218 1.3603 9.98505 0.925103 9.06946 0.299993C8.89826 0.18383 8.69487 0.121582 8.48651 0.121582C8.27814 0.121582 8.07475 0.18383 7.90355 0.299993C6.98796 0.925103 5.95124 1.3603 4.85722 1.57878C3.76321 1.79726 2.63504 1.7944 1.54219 1.57039C1.39281 1.53884 1.2381 1.54043 1.08943 1.57506C0.940764 1.60968 0.801918 1.67645 0.683102 1.77045C0.564445 1.8646 0.468862 1.98356 0.403379 2.11858C0.337895 2.2536 0.304174 2.40126 0.304693 2.5507V10.003C0.303784 11.4372 0.653211 12.8509 1.32388 14.1263C1.99454 15.4017 2.96703 16.5019 4.16037 17.3353L7.89332 19.9361C8.06653 20.0568 8.27388 20.1216 8.48651 20.1216C8.69913 20.1216 8.90648 20.0568 9.07969 19.9361L12.8126 17.3353C14.006 16.5019 14.9785 15.4017 15.6491 14.1263C16.3198 12.8509 16.6692 11.4372 16.6683 10.003V2.5507C16.6688 2.40126 16.6351 2.2536 16.5696 2.11858C16.5041 1.98356 16.4086 1.8646 16.2899 1.77045ZM14.6229 10.003C14.6236 11.1181 14.3521 12.2173 13.8309 13.2091C13.3097 14.2008 12.5539 15.0565 11.6263 15.7048L8.48651 17.8955L5.34674 15.7048C4.41916 15.0565 3.66331 14.2008 3.14209 13.2091C2.62088 12.2173 2.34936 11.1181 2.35015 10.003V3.70106C4.49422 3.88055 6.64155 3.39398 8.48651 2.31062C10.3315 3.39398 12.4788 3.88055 14.6229 3.70106V10.003ZM10.0615 7.71231L7.31037 10.4132L6.40014 9.51288C6.20756 9.32451 5.94636 9.21869 5.67401 9.21869C5.40165 9.21869 5.14045 9.32451 4.94787 9.51288C4.75529 9.70124 4.6471 9.95671 4.6471 10.2231C4.6471 10.4895 4.75529 10.745 4.94787 10.9333L6.58423 12.5338C6.67931 12.6276 6.79243 12.702 6.91705 12.7528C7.04168 12.8036 7.17536 12.8297 7.31037 12.8297C7.44538 12.8297 7.57906 12.8036 7.70369 12.7528C7.82832 12.702 7.94143 12.6276 8.03651 12.5338L11.5547 9.12276C11.7473 8.93439 11.8555 8.67892 11.8555 8.41253C11.8555 8.14615 11.7473 7.89067 11.5547 7.70231C11.3621 7.51395 11.1009 7.40813 10.8285 7.40813C10.5562 7.40813 10.295 7.51395 10.1024 7.70231L10.0615 7.71231Z"
        fill={fill}
      />
    </svg>
  );
};

export default ShieldIcon;
