import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { DebouncedFunc } from "lodash";
import { useRef } from "react";
import countryApi from "src/apis/country.api";
import { Dropdown, List, Option, Search, Select } from "src/components/Dropdown";
import { TwoWayArrowIcon } from "src/components/Icon";
import useOnChange from "src/hooks/useOnChange";

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
  setProvinceQuery?: string | DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void>;
};

const ModalSelect = ({
  title,
  subtitle = "",
  colSpan = 1,
  arrowIconBefore = false,
  extendOnMobile,
  setProvinceQuery,
}: ModalSelectPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={classNames("relative rounded-lg bg-tertiaryGray py-6 pr-16 pl-6", {
        "col-span-2": colSpan === 2,
        "col-span-1": colSpan === 1,
        "col-span-2 lg:col-span-1": colSpan === 2 && extendOnMobile,
      })}
      // onClick={handleFocusInput}
      aria-hidden={true}
    >
      <div className="flex flex-col gap-y-1">
        <h4 className="text-lg font-semibold">{title}</h4>
        <Dropdown>
          <Select placeholder={subtitle}></Select>
          <List>
            <Search
              placeholder="Tìm kiếm ga đi..."
              onChange={setProvinceQuery}
            ></Search>
            {countriesData &&
              countriesData.map((country) => (
                <Option
                  key={country}
                  onClick={() => handleSelectOption("country", country)}
                >
                  <span className="capitalize">{country}</span>
                </Option>
              ))}
          </List>
        </Dropdown>
      </div>
      {arrowIconBefore && (
        <span className="absolute top-1/2 -left-4 z-[1] hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white lg:flex">
          <TwoWayArrowIcon></TwoWayArrowIcon>
        </span>
      )}
    </div>
  );
};

export default ModalSelect;
