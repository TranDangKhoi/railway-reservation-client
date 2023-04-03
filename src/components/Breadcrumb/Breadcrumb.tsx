import React from "react";
import { Link } from "react-router-dom";

type BreadcrumbPropsType = {
  firstText?: string;
  firstLink?: string;
  secondText?: string;
  secondLink?: string;
  thirdText?: string;
  thirdLink?: string;
  containerClassName?: string;
};

const Breadcrumb = ({
  firstText,
  firstLink,
  secondText,
  secondLink,
  thirdText,
  thirdLink,
  containerClassName,
}: BreadcrumbPropsType) => {
  return (
    <div className={`flex items-center gap-x-3 ${containerClassName}`}>
      {firstText && firstLink && (
        <>
          <Link to={firstLink}>{firstText}</Link>
          <span>{">"}</span>
        </>
      )}
      {secondText && secondLink && (
        <Link
          to={secondLink}
          className="cursor-pointer text-secondaryGray"
        >
          {secondText}
        </Link>
      )}
      {thirdText && thirdLink && (
        <>
          <span>{">"}</span>
          <Link
            to={thirdLink}
            className="cursor-pointer text-secondaryGray"
          >
            {thirdText}
          </Link>
        </>
      )}
    </div>
  );
};

export default Breadcrumb;
