import React from "react";
import { DropdownProvider } from "src/contexts/dropdown.context";

type DropdownPropsType = {
  children: React.ReactNode;
};
const Dropdown = ({ children, ...props }: DropdownPropsType) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
