import React, { useContext } from "react";
import { DropdownContext } from "src/contexts/dropdown.context";

type OptionPropsType = {
  onClick: () => void;
  children: React.ReactNode;
};

const Option = ({ onClick, children }: OptionPropsType) => {
  const { setShow } = useContext(DropdownContext);
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="dark:text-text4 dark:bg-darkSoft hover:text-secondary hover:border-l-secondary flex cursor-pointer items-center justify-between border-l-4 border-l-transparent px-6 py-4 text-sm transition-all"
      onClick={handleClick}
      aria-hidden
    >
      {children}
    </div>
  );
};

export default Option;
