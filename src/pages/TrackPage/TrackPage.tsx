import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import provinceApi from "src/apis/province.api";
import trackApi from "src/apis/track.api";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ReturnTicketIcon,
  SendoTrainIcon,
  TicketIcon,
  TrainIcon,
} from "src/components/Icon";
import DashLineIcon from "src/components/Icon/DashLineIcon";
import Popover from "src/components/Popover";
import SkeletonLoading from "src/components/SkeletonLoading";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import useQueryConfig from "src/hooks/useQueryConfig";
import { trackSearchSchema, TrackSearchType } from "src/utils/schemas";
import ModalSelect from "../Homepage/components/ModalSelect";
import ModalSelectDate from "../Homepage/components/ModalSelectDate";
import ModalTab from "../Homepage/components/ModalTab";

type FormDataType = TrackSearchType;

const TrackPage = () => {
  const [departureTime, setDepartureTime] = useState<Date>(new Date());
  const [returnTime, setReturnTime] = useState<Date>(new Date());
  const queryConfig = useQueryConfig();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      departureTime: departureTime.toString(),
      returnTime: returnTime.toString(),
    },
    resolver: yupResolver(trackSearchSchema),
  });
  const navigate = useNavigate();
  const { data: provincesQueryData } = useQuery({
    queryKey: ["countries"],
    queryFn: () => provinceApi.getCountries(),
  });

  const handleSelectOption = (name: keyof FormDataType, value: string) => {
    setValue(name, value);
  };
  const handleSearchTrack = handleSubmit((data) => {
    navigate({
      pathname: path.trackDetails,
      search: createSearchParams({
        ...queryConfig,
        departureStation: data.departureStation,
        arrivalStation: data.arrivalStation,
        departureTime: `${departureTime.toISOString().replaceAll("/", "-").slice(0, 10)} 00:00:00.0000000`,
        returnTime: `${returnTime.toISOString().replaceAll("/", "-").slice(0, 10)} 23:59:59.0000000`,
      }).toString(),
    });
  });
  const provincesData = provincesQueryData?.data.map((province) =>
    province.name.replace("Tỉnh", "").replace("Thành phố", "").trim(),
  );
  return (
    <>
      <div className="relative h-[230px] w-full bg-gray-200 bg-cover bg-bottom-center-4 bg-no-repeat">
        <div className="absolute top-8 left-8 flex items-center gap-x-2 text-sm">
          <Link to={path.homepage}>Trang chủ</Link>
          <span>{">"}</span>
          <span className="cursor-pointer text-secondaryGray">Tìm chuyến đi</span>
        </div>
        <form
          onSubmit={handleSearchTrack}
          className="absolute top-full left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-md bg-white py-5 pl-12 pr-10 shadow-shadow1 sm:w-[500px] lg:top-[10px] lg:w-[1000px] lg:translate-y-[100px] xl:w-[1170px]"
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
                <ModalSelectDate
                  title="Ngày về"
                  subtitle="Chọn ngày về"
                  arrowIconBefore={true}
                  name="returnTime"
                  returnTime={returnTime}
                  setReturnTime={setReturnTime}
                  handleSelectOption={handleSelectOption}
                ></ModalSelectDate>
              </div>
            </div>
            <div className="flex-shrink-0 lg:self-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-7 py-6 font-medium text-white transition-all duration-150 hover:bg-hover"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-[#FAFAFB]">
        <div className="container pt-48">
          {/* <SkeletonLoading></SkeletonLoading> */}
          <div className="rounded-lg border-2 border-primaryGray bg-white py-4 px-10 shadow-md">
            <div className="flex items-center gap-x-2">
              <div className="text-lg font-medium">Hồ Chí Minh</div>
              <ArrowRightIcon
                width={17}
                height={12}
              ></ArrowRightIcon>
              <div className="text-lg font-medium">Hà Nội</div>
              <div className="text-lg font-medium">Thứ 5, 19 tháng 8</div>
            </div>
            <div className="mt-7 flex items-start justify-between">
              <div className="grid grid-cols-5 gap-x-6">
                <div className="relative col-span-1 flex h-[65px] w-[60px] items-center justify-center bg-sendoTrainBackground bg-contain bg-no-repeat">
                  <div className="text-[15px] font-bold">SE7</div>
                </div>
                <div className="col-span-1 flex flex-col items-start justify-start">
                  <div className="text-xl font-bold">Hồ Chí Minh</div>
                  <div className="text-base font-medium">Thời gian đi:</div>
                  <span className="text-base font-medium text-secondaryGray">24/04/2023 8:45AM</span>
                </div>
                <div className="relative col-span-2 flex items-center justify-center">
                  <div className="absolute top-1/2 -translate-y-1/2">
                    <div className="flex h-[67px] w-[157px] items-center justify-center gap-x-3 bg-dashLineBackground bg-contain bg-no-repeat">
                      <TrainIcon className="h-5 w-5"></TrainIcon>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-start justify-start">
                  <div className="text-xl font-bold">Hà Nội</div>
                  <div className="text-base font-medium">Thời gian về:</div>
                  <span className="text-base font-medium text-secondaryGray">26/04/2023 8:45AM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-medium">63 chỗ trống</span>
                <button className="w-full rounded-lg bg-primary px-3 py-4 text-white">Đặt chỗ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackPage;
