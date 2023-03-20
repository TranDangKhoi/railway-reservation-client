import classNames from "classnames";
import { useContext, useRef, useState } from "react";
import { Dropdown, List, Search, Select } from "src/components/Dropdown";
import { TwoWayArrowIcon } from "src/components/Icon";
import Popover from "src/components/Popover";
import PopoverFocus from "src/components/PopoverFocus";
import { DropdownContext } from "src/contexts/dropdown.context";
import useOnChange from "src/hooks/useOnChange";

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
  countriesData?: string[];
};

const ModalSelect = ({
  title,
  subtitle,
  colSpan = 1,
  countriesData,
  arrowIconBefore = false,
  extendOnMobile,
}: ModalSelectPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [provinceQuery, setProvinceQuery] = useOnChange();
  const [isOpen, setOpen] = useState<boolean>(true);
  // const handleFocusInput = () => {
  //   const inputElement = inputRef.current as HTMLInputElement;
  //   inputElement.focus();
  // };
  const handleShowDropdown = () => {
    setOpen(true);
  };
  return (
    <PopoverFocus
      className={classNames("relative rounded-lg bg-tertiaryGray py-6 pr-16 pl-6", {
        "col-span-2": colSpan === 2,
        "col-span-1": colSpan === 1,
        "col-span-2 lg:col-span-1": colSpan === 2 && extendOnMobile,
      })}
      placement="bottom"
      renderPopover={
        <div className="max-h-[300px] overflow-y-auto bg-white p-4">
          {countriesData &&
            countriesData.map((country) => (
              <div
                className="text-black"
                key={country}
              >
                {country}
              </div>
            ))}
        </div>
      }
    >
      <div
        // onClick={handleFocusInput}
        aria-hidden={true}
      >
        <div className="flex cursor-pointer flex-col gap-y-1">
          <h4 className="text-lg font-semibold">{title}</h4>
          <div
            className="bg-tertiaryGray text-sm font-medium text-secondaryGray outline-none placeholder:text-secondaryGray"
            placeholder={subtitle}
            onFocus={handleShowDropdown}
            ref={inputRef}
          >
            {subtitle}
          </div>
        </div>
        {arrowIconBefore && (
          <span className="absolute top-1/2 -left-4 z-[1] hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white lg:flex">
            <TwoWayArrowIcon></TwoWayArrowIcon>
          </span>
        )}
      </div>
    </PopoverFocus>
  );
};

export default ModalSelect;
