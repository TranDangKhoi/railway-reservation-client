import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import provinceApi from "src/apis/province.api";
import { ArrowDownIcon, ReturnTicketIcon, TicketIcon, TrainIcon } from "src/components/Icon";
import Popover from "src/components/Popover";
import { trackSearchSchema, TrackSearchType } from "src/utils/schemas";
import ModalSelect from "./components/ModalSelect";
import ModalSelectDate from "./components/ModalSelectDate";
import ModalTab from "./components/ModalTab";

type FormDataType = TrackSearchType;

const Homepage = () => {
  const [departureTime, setDepartureTime] = useState<Date>(new Date());
  const [returnTime, setReturnTime] = useState<string>(new Date().toLocaleDateString("en-GB"));
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormDataType>({
    // resolver: yupResolver(trackSearchSchema),
    defaultValues: {
      departureTime: departureTime,
    },
  });
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: () => provinceApi.getCountries(),
  });
  const handleSelectOption = (name: keyof FormDataType, value: string) => {
    setValue(name, value);
  };
  const handleSearchTrack = handleSubmit((data) => {
    console.log({
      ...data,
      departureTime: `${departureTime.toLocaleDateString("en-GB").replaceAll("/", "-")} 23:59:59.0000000`,
    });
  });
  const provincesData = data?.data.map((province) => province.name.replace("Tỉnh", "").replace("Thành phố", "").trim());
  return (
    <div className="relative h-[430px] w-full bg-homepageBackground bg-cover bg-bottom-center-4 bg-no-repeat sm:h-[630px]">
      <h2 className="absolute top-36 left-12 w-[300px] font-secondary font-bold text-white sm:block sm:text-4xl lg:w-[487px] lg:text-6xl lg:leading-[70px]">
        Travel With Us And Enjoy your Journey !
      </h2>
      <form
        onSubmit={handleSearchTrack}
        className="absolute top-full left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-md bg-white py-5 pl-12 pr-10 shadow-shadow1 sm:w-[500px] lg:top-[400px] lg:w-[1000px] lg:translate-y-[100px] xl:w-[1170px]"
      >
        <div className="flex flex-col justify-between gap-x-5 lg:flex-row">
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex items-center justify-center border-b-[3px] border-b-input pb-5 lg:justify-between">
              <div className="flex items-center gap-x-4 lg:justify-start">
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={<TrainIcon className="h-4 w-4"></TrainIcon>}
                >
                  Đặt vé
                </ModalTab>
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={
                    <TicketIcon
                      className="h-4 w-4"
                      fill="black"
                    ></TicketIcon>
                  }
                >
                  Tra cứu vé
                </ModalTab>
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={
                    <ReturnTicketIcon
                      className="h-4 w-4"
                      fill="black"
                    ></ReturnTicketIcon>
                  }
                >
                  Trả vé
                </ModalTab>
              </div>
              <Popover
                placement="bottom"
                offsetPx={15}
                renderPopover={
                  <div className="bg-white shadow-shadow1">
                    <button className="block w-full py-3 pl-4 pr-20 text-left hover:bg-secondaryGray hover:bg-opacity-40">
                      Khứ hồi
                    </button>
                    <button className="block w-full py-3 pl-4 pr-20 text-left hover:bg-secondaryGray hover:bg-opacity-40">
                      Một chiều
                    </button>
                  </div>
                }
              >
                <button className="hidden items-center gap-x-2 lg:flex">
                  <span className="font-medium">Khứ hồi</span>
                  <ArrowDownIcon
                    width={11}
                    height={10}
                    fill="#84878B"
                    kind="primary"
                  ></ArrowDownIcon>
                </button>
              </Popover>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 lg:grid-cols-5 lg:gap-x-2">
              <ModalSelect
                title="Ga đi"
                subtitle="Chọn ga đi"
                colSpan={2}
                provincesData={provincesData}
                inputPlaceholder="Tìm kiếm ga..."
                name="departureStation"
                handleSelectOption={handleSelectOption}
              ></ModalSelect>
              <ModalSelect
                title="Ga đến"
                subtitle="Chọn ga đến"
                arrowIconBefore={true}
                colSpan={2}
                extendOnMobile
                name="arrivalStation"
                provincesData={provincesData}
                handleSelectOption={handleSelectOption}
              ></ModalSelect>
              <ModalSelectDate
                departureTime={departureTime}
                title="Ngày đi"
                subtitle="Chọn ngày đi"
                name="departureTime"
                arrowIconBefore={true}
                setDepartureTime={setDepartureTime}
                handleSelectOption={handleSelectOption}
              ></ModalSelectDate>
              {/* <ModalSelectDate
                title="Ngày về"
                subtitle="Chọn ngày về"
                name="returnTime"
                arrowIconBefore={true}
              ></ModalSelectDate> */}
            </div>
          </div>
          <div className="flex-shrink-0 lg:self-end">
            <button className="w-full rounded-lg bg-primary px-7 py-6 font-medium text-white transition-all duration-150 hover:bg-hover">
              Tìm kiếm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Homepage;
