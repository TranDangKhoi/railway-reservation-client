import React from "react";

type ModalTabProps = {
  children?: React.ReactNode;
  iconComponent?: React.ReactNode;
  containerClassName?: string;
  textClassName?: string;
};

const ModalTab = ({ children, containerClassName, iconComponent, textClassName = "font-medium" }: ModalTabProps) => {
  return (
    <div className={containerClassName}>
      {iconComponent}
      <span className={`text-xs font-medium sm:text-sm ${textClassName}`}>{children}</span>
    </div>
  );
};

export default ModalTab;
