import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputProps = {
  type: React.HTMLInputTypeAttribute;
  errorMsg?: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  type = "text",
  errorMsg,
  name,
  register,
  inputClassName = "w-full p-3 outline-none rounded-lg h-[48px] border-2 transition-all duration-150 font-medium",
  containerClassName = "",
  errorClassName = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  placeholder = "",
  rules,
  ...rest
}: InputProps) => {
  console.log(errorMsg);
  const registerResult = register && name ? register(name, rules) : {};
  return (
    <div className={containerClassName}>
      <input
        type={type}
        placeholder={placeholder}
        className={classNames(
          `${inputClassName}`,
          // Error!
          {
            "border-red-600 bg-red-50 focus:border-red-600": errorMsg,
          },
          {
            "bg-input hover:border-primary": !errorMsg,
          },
          // Custom classNames
        )}
        {...rest}
        {...registerResult}
      />
      <div className={errorClassName}>{errorMsg}</div>
    </div>
  );
};

export default Input;
