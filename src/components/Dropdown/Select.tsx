import React, { useContext } from "react";
import { DropdownContext } from "src/contexts/dropdown.context";
import { ArrowDownIcon } from "../Icon";

type SelectPropsType = {
  placeholder?: string;
};

const Select = ({ placeholder = "Please select a category" }: SelectPropsType) => {
  const { show, handleToggleDropdown } = useContext(DropdownContext);
  return (
    <div
      className={`text-text3 dark:border-darkStroke border-strock flex cursor-pointer items-center justify-between rounded-lg border-2 px-6 py-4 text-sm font-medium`}
      onClick={handleToggleDropdown}
      aria-hidden
    >
      <span className="text-text3 capitalize">{placeholder}</span>
      <span>{show ? <ArrowDownIcon></ArrowDownIcon> : <ArrowDownIcon></ArrowDownIcon>}</span>
    </div>
  );
};

export default Select;
