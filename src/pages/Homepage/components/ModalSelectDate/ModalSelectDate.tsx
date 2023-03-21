import classNames from "classnames";
import React, { useState } from "react";
import { TwoWayArrowIcon } from "src/components/Icon";
import PopoverDismiss from "src/components/PopoverDismiss";
import { TrackSearchType } from "src/utils/schemas";

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
  name: keyof TrackSearchType;
  departureTime?: Date;
  returnTime?: Date;
};

const ModalSelectDate = ({
  title,
  subtitle,
  colSpan = 1,
  name,
  arrowIconBefore = false,
  extendOnMobile,
}: ModalSelectPropsType) => {
  const [stationName, setStationName] = useState(subtitle);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectStation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setStationName(e.currentTarget.outerText);
    // handleSelectProvince(name as keyof TrackSearchType, e.currentTarget.outerText);
  };
  // Declare a if-else statement here, if it's for departure time then return the code for departure time, the same for return time
  return (
    <PopoverDismiss
      className={classNames(
        "relative cursor-pointer rounded-lg bg-tertiaryGray py-6 pr-16 pl-6 transition-all duration-150 hover:bg-[#E8EFFF]",
        {
          "col-span-2": colSpan === 2,
          "col-span-1": colSpan === 1,
          "col-span-2 lg:col-span-1": colSpan === 2 && extendOnMobile,
        },
      )}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placement="bottom"
      renderPopover={<div className="bg-white p-4"></div>}
    >
      <div className="flex flex-col gap-y-1">
        <h4 className="text-lg font-semibold">{title}</h4>
        <div className="text-sm font-medium text-secondaryGray">{stationName}</div>
      </div>
      {arrowIconBefore && (
        <span className="absolute top-1/2 -left-4 z-[1] hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white lg:flex">
          <TwoWayArrowIcon></TwoWayArrowIcon>
        </span>
      )}
    </PopoverDismiss>
  );
};

export default ModalSelectDate;
