import classNames from "classnames";
import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({ type = "submit", containerClassName, className, children, isLoading, onClick }: ButtonProps) => {
  return (
    <div className={containerClassName}>
      <button
        type={type}
        className={classNames(
          "w-full rounded-lg bg-primary py-3 px-2 text-center text-[18px] font-medium uppercase text-white hover:bg-hover",
          { "pointer-events-none cursor-not-allowed select-none bg-opacity-50 hover:bg-opacity-50": isLoading },
          `${className}`,
        )}
        disabled={isLoading}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
