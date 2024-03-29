import React from "react";
import { AuthenticationType, InfoType } from "src/schemas/schemas";

type LabelPropsType = {
  children?: React.ReactNode;
  htmlFor?: keyof (AuthenticationType & InfoType);
  className?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ htmlFor, children, className }: LabelPropsType) => {
  return (
    <label
      className={`block text-sm font-medium text-secondaryGray ${className}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
