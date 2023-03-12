import React from "react";
import { TrainIcon } from "src/components/Icon";

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
      <span className={`text-sm font-medium ${textClassName}`}>{children}</span>
    </div>
  );
};

export default ModalTab;
