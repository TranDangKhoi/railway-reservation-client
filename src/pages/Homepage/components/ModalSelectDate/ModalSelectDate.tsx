import classNames from "classnames";
import React, { useRef } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { TwoWayArrowIcon } from "src/components/Icon";
import { TrackSearchType } from "src/utils/schemas";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi); // register it with the name you want

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
  name: keyof TrackSearchType;
  departureTime?: Date;
  returnTime?: Date;
  setDepartureTime?: React.Dispatch<React.SetStateAction<Date>>;
  setReturnTime?: React.Dispatch<React.SetStateAction<Date>>;
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
    setDepartureTime && setDepartureTime(date);
    setReturnTime && setReturnTime(date);
    handleSelectOption(name as keyof TrackSearchType, date.toLocaleDateString("en-GB"));
  };
  const handleFocusDateInput = () => {
    const dateInputEl = document.querySelector(`#${name}`) as HTMLInputElement;
    dateInputEl.focus();
  };
  if (name === "departureTime") {
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
        onClick={handleFocusDateInput}
        aria-hidden
      >
        <div className="flex flex-col gap-y-1">
          <h4 className="text-lg font-semibold">{title}</h4>
          <ReactDatePicker
            selected={departureTime}
            onChange={handleSelectDate}
            name={name}
            minDate={new Date()}
            value={departureTime?.toLocaleDateString("en-GB")}
            placeholderText={subtitle}
            locale="vi"
            id={name}
            className=" cursor-pointer group-hover:bg-[#E8EFFF]"
          ></ReactDatePicker>
        </div>
        {arrowIconBefore && (
          <span className="absolute top-1/2 -left-4 z-[1] hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white lg:flex">
            <TwoWayArrowIcon></TwoWayArrowIcon>
          </span>
        )}
      </div>
    );
  } else {
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
        onClick={handleFocusDateInput}
        aria-hidden
      >
        <div className="flex flex-col gap-y-1">
          <h4 className="text-lg font-semibold">{title}</h4>
          <ReactDatePicker
            selected={returnTime}
            onChange={handleSelectDate}
            name={name}
            minDate={new Date()}
            value={returnTime?.toLocaleDateString("en-GB")}
            placeholderText={subtitle}
            locale="vi"
            id={name}
            className=" cursor-pointer group-hover:bg-[#E8EFFF]"
          ></ReactDatePicker>
        </div>
        {arrowIconBefore && (
          <span className="absolute top-1/2 -left-4 z-[1] hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white lg:flex">
            <TwoWayArrowIcon></TwoWayArrowIcon>
          </span>
        )}
      </div>
    );
  }
};

export default ModalSelectDate;
