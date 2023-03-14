import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { EyeCloseIcon, EyeOpenIcon } from "../Icon";

type InputProps = {
  type: React.HTMLInputTypeAttribute;
  errorMsg?: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  name: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  rules?: RegisterOptions;
} & InputHTMLAttributes<HTMLInputElement>;

const InputPassword = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  errorMsg,
  name,
  register,
  inputClassName = "w-full py-3 pl-3 pr-14 outline-none rounded-lg h-[48px] border-2 transition-all duration-150 font-medium",
  containerClassName = "",
  errorClassName = "mt-1 text-red-600 min-h-[1.25rem] text-sm",
  placeholder = "",
  rules,
  showPassword,
  setShowPassword,
  ...rest
}: InputProps) => {
  const registerResult = register && name ? register(name, rules) : {};
  return (
    <div className={containerClassName}>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
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
        {showPassword ? (
          <span
            onClick={() => setShowPassword(false)}
            className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            aria-hidden={true}
          >
            <EyeOpenIcon
              width={20}
              height={18}
              fill="gray"
            ></EyeOpenIcon>
          </span>
        ) : (
          <span
            onClick={() => setShowPassword(true)}
            className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            aria-hidden={true}
          >
            <EyeCloseIcon
              width={20}
              height={18}
              fill="gray"
            ></EyeCloseIcon>
          </span>
        )}
      </div>
      <div className={errorClassName}>{errorMsg}</div>
    </div>
  );
};

export default InputPassword;
