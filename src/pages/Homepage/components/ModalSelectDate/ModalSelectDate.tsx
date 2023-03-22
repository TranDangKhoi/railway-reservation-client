import classNames from "classnames";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
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
  departureTime: string;
  returnTime?: string;
  setDepartureTime: React.Dispatch<React.SetStateAction<string>>;
  setReturnTime?: React.Dispatch<React.SetStateAction<string>>;
  handleSelectOption: (name: keyof TrackSearchType, value: string) => void;
};

const ModalSelectDate = ({
  title,
  subtitle,
  departureTime,
  returnTime,
  setDepartureTime,
  setReturnTime,
  colSpan = 1,
  name,
  arrowIconBefore = false,
  handleSelectOption,
  extendOnMobile,
}: ModalSelectPropsType) => {
  const handleSelectDate = (date: Date) => {
    setDepartureTime(date.toLocaleDateString("en-GB"));
    handleSelectOption(name as keyof TrackSearchType, date.toLocaleDateString("en-GB"));
  };
  // Declare a if-else statement here, if it's for departure time then return the code for departure time, the same for return time
  console.log();
  return (
    <div
      className={classNames(
        "group relative cursor-pointer rounded-lg bg-tertiaryGray py-6 pr-16 pl-6 transition-all duration-150 hover:bg-[#E8EFFF]",
        {
          "col-span-2": colSpan === 2,
          "col-span-1": colSpan === 1,
          "col-span-2 lg:col-span-1": colSpan === 2 && extendOnMobile,
        },
      )}
    >
      <div className="flex flex-col gap-y-1">
        <h4 className="text-lg font-semibold">{title}</h4>
        <ReactDatePicker
          selected={new Date("Wed Mar 23 2023 16:10:15 GMT+0700")}
          onChange={handleSelectDate}
          name={name}
          value={departureTime}
          placeholderText={subtitle}
          className="group-hover:bg-[#E8EFFF]"
        ></ReactDatePicker>
      </div>
      {arrowIconBefore && (
        <span className="absolute top-1/2 -left-4 z-[1] hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white lg:flex">
          <TwoWayArrowIcon></TwoWayArrowIcon>
        </span>
      )}
    </div>
  );
};

export default ModalSelectDate;
