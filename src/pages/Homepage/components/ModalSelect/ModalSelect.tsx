import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { debounce } from "lodash";
import React, { useState } from "react";
import provinceApi from "src/apis/province.api";
import { LocationIcon, TwoWayArrowIcon } from "src/components/Icon";
import PopoverDismiss from "src/components/PopoverDismiss";
import { TrackSearchType } from "src/utils/schemas";

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
  provincesData?: string[];
  name: keyof TrackSearchType;
  inputPlaceholder?: string;
  errorMsg?: string;
  handleSelectOption: (name: keyof TrackSearchType, value: string) => void;
};

const ModalSelect = ({
  title,
  subtitle,
  colSpan = 1,
  name,
  provincesData,
  inputPlaceholder,
  errorMsg,
  arrowIconBefore = false,
  extendOnMobile,
  handleSelectOption,
}: ModalSelectPropsType) => {
  const [stationName, setStationName] = useState(subtitle);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stationQuery, setStationQuery] = useState<string>("");
  const { data, isFetching } = useQuery({
    queryKey: ["countries", { stationQuery }],
    queryFn: () => provinceApi.searchCountries(stationQuery),
    staleTime: 60 * 1000,
  });

  // Get all provinces name without "Tỉnh" and "Thành phố" in it
  const newProvincesData = data?.data.map((province) =>
    province.name.replace("Tỉnh", "").replace("Thành phố", "").trim(),
  );

  const handleQueryStation = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setStationQuery(inputValue);
  }, 1000);

  const handleSelectStation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setStationName(e.currentTarget.outerText);
    setIsOpen(false);
    handleSelectOption(name as keyof TrackSearchType, e.currentTarget.outerText);
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
      offsetPx={5}
      enableArrow={false}
      renderPopover={
        <div className="max-h-[280px] overflow-y-auto bg-white p-4 shadow-shadow1">
          <input
            type="text"
            className="my-2 w-full rounded-lg border-2 border-gray-300 p-2 outline-none"
            placeholder={inputPlaceholder}
            onChange={handleQueryStation}
          />
          {newProvincesData?.length === 0 &&
            provincesData &&
            provincesData.map((province) => (
              <div
                className="flex cursor-pointer gap-x-2 py-2 hover:bg-tertiaryGray"
                key={province}
                aria-hidden
                onClick={handleSelectStation}
              >
                <LocationIcon></LocationIcon>
                <div className="text-sm font-medium text-secondaryGray">{province}</div>
              </div>
            ))}
          {!isFetching &&
            newProvincesData &&
            newProvincesData.map((province) => (
              <div
                className="flex cursor-pointer gap-x-2 py-2 hover:bg-tertiaryGray"
                key={province}
                aria-hidden
                onClick={handleSelectStation}
              >
                <LocationIcon></LocationIcon>
                <div className="text-sm font-medium text-secondaryGray">{province}</div>
              </div>
            ))}
          {isFetching && (
            <div
              role="status"
              className="mt-6 animate-pulse"
            >
              <div className="mb-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-y-1">
        <h4 className="text-lg font-semibold">{title}</h4>
        <div
          className={classNames(
            "text-sm font-medium",
            {
              "text-red-500": errorMsg && stationName === subtitle,
            },
            {
              "text-secondaryGray": !errorMsg && stationName !== subtitle,
            },
          )}
        >
          {errorMsg && stationName === subtitle ? errorMsg : stationName}
        </div>
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
