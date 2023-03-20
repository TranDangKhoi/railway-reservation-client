import classNames from "classnames";
import { useContext, useRef } from "react";
import { Dropdown, List, Search, Select } from "src/components/Dropdown";
import { TwoWayArrowIcon } from "src/components/Icon";
import { DropdownContext } from "src/contexts/dropdown.context";
import useOnChange from "src/hooks/useOnChange";

type ModalSelectPropsType = {
  title?: string;
  subtitle?: string;
  colSpan?: number;
  arrowIconBefore?: boolean;
  extendOnMobile?: boolean;
};

const ModalSelect = ({
  title,
  subtitle,
  colSpan = 1,
  arrowIconBefore = false,
  extendOnMobile,
}: ModalSelectPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [provinceQuery, setProvinceQuery] = useOnChange();
  const handleFocusInput = () => {
    const inputElement = inputRef.current as HTMLInputElement;
    inputElement.focus();
  };
  return (
    <div
      className={classNames("relative rounded-lg bg-tertiaryGray py-6 pr-16 pl-6", {
        "col-span-2": colSpan === 2,
        "col-span-1": colSpan === 1,
        "col-span-2 lg:col-span-1": colSpan === 2 && extendOnMobile,
      })}
      onClick={handleFocusInput}
      aria-hidden={true}
    >
      <div className="flex flex-col gap-y-1">
        <h4 className="text-lg font-semibold">{title}</h4>
        <Dropdown>
          <Select placeholder="Chọn ga đi"></Select>
          <List>
            <Search
              placeholder="Tìm kiếm ga đi..."
              onChange={setProvinceQuery}
            ></Search>
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
