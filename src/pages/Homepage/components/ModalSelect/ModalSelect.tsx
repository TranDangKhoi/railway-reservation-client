import classNames from "classnames";
import React, { useState } from "react";
import { LocationIcon, TwoWayArrowIcon } from "src/components/Icon";
import PopoverDismiss from "src/components/PopoverDismiss";
import { TrackSearchType } from "src/utils/schemas";

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
  countriesData?: string[];
  name: keyof TrackSearchType;
  handleSelectProvince: (name: keyof TrackSearchType, value: string) => void;
};

const ModalSelect = ({
  title,
  subtitle,
  colSpan = 1,
  name,
  countriesData,
  arrowIconBefore = false,
  extendOnMobile,
  handleSelectProvince,
}: ModalSelectPropsType) => {
  const [stationName, setStationName] = useState(subtitle);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSelectStation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setStationName(e.currentTarget.outerText);
    setIsOpen(false);
    handleSelectProvince(name as keyof TrackSearchType, e.currentTarget.outerText);
  };
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
      offsetPx={0}
      enableArrow={false}
      renderPopover={
        <div className="max-h-[280px] overflow-y-auto bg-white p-4 shadow-shadow1">
          <input
            type="text"
            className="my-2 w-full rounded-lg border-2 border-gray-300 p-2 outline-none"
          />
          {countriesData &&
            countriesData.map((country) => (
              <div
                className="flex cursor-pointer gap-x-2 py-2 hover:bg-tertiaryGray"
                key={country}
                aria-hidden
                onClick={handleSelectStation}
              >
                <LocationIcon></LocationIcon>
                <div className="text-sm font-medium text-secondaryGray">{country}</div>
              </div>
            ))}
        </div>
      }
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

export default ModalSelect;
