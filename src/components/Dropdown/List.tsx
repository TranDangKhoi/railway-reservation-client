import React, { useContext } from "react";
import { DropdownContext } from "src/contexts/dropdown.context";

type ListPropsType = {
  children: React.ReactNode;
};

const List = ({ children }: ListPropsType) => {
  const { show } = useContext(DropdownContext);
  return (
    <>
      {show && (
        <div className="absolute left-0 top-full z-20 max-h-[300px] w-full overflow-y-auto rounded-lg border border-gray-200 border-t-transparent bg-white shadow-sm">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
