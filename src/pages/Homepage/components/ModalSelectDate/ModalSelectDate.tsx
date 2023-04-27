import classNames from "classnames";
import vi from "date-fns/locale/vi";
import React from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { TwoWayArrowIcon } from "src/components/Icon";
import { TrackSearchType } from "src/schemas/schemas";
registerLocale("vi", vi); // register it with the name you want

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
  name: keyof TrackSearchType;
  departureTime?: Date;
  setDepartureTime?: React.Dispatch<React.SetStateAction<Date>>;
  handleSelectOption: (name: keyof TrackSearchType, value: string) => void;
};

const ModalSelectDate = ({
  title,
  subtitle,
  departureTime,
  setDepartureTime,
  colSpan = 1,
  name,
  arrowIconBefore = false,
  handleSelectOption,
  extendOnMobile,
}: ModalSelectPropsType) => {
  const handleSelectDate = (date: Date) => {
    setDepartureTime && setDepartureTime(date);
    handleSelectOption(name as keyof TrackSearchType, date.toLocaleDateString("en-GB"));
  };
  const handleFocusDateInput = () => {
    const dateInputEl = document.querySelector(`#${name}`) as HTMLInputElement;
    dateInputEl.focus();
  };
  return (
    <div
      className={classNames(
        "group relative cursor-pointer rounded-lg bg-tertiaryGray py-4 pr-10 pl-3 transition-all duration-150 hover:bg-[#E8EFFF] sm:py-6 sm:pr-16 sm:pl-6",
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
          minDate={new Date("2023-04-20T00:00:00.000Z")}
          value={departureTime?.toLocaleDateString("en-GB")}
          placeholderText={subtitle}
          locale="vi"
          id={name}
          className="w-full cursor-pointer bg-tertiaryGray text-[14px] font-medium text-black outline-none group-hover:bg-[#E8EFFF]"
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
