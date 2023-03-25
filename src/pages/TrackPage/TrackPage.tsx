import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import provinceApi from "src/apis/province.api";
import trackApi from "src/apis/track.api";
import { ArrowDownIcon, ReturnTicketIcon, TicketIcon, TrainIcon } from "src/components/Icon";
import Popover from "src/components/Popover";
import SkeletonLoading from "src/components/SkeletonLoading";
import { path } from "src/constants/path.enum";
import useQueryConfig from "src/hooks/useQueryConfig";
import { trackSearchSchema, TrackSearchType } from "src/utils/schemas";
import ModalSelect from "../Homepage/components/ModalSelect";
import ModalSelectDate from "../Homepage/components/ModalSelectDate";
import ModalTab from "../Homepage/components/ModalTab";
import Track from "./components/Track";

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
  const { data: tracksQueryData, isLoading: tracksQueryIsLoading } = useQuery({
    queryKey: ["tracks", queryConfig],
    queryFn: () => trackApi.findTracks(queryConfig),
  });
  const tracksData = tracksQueryData?.data;
  console.log(tracksData);
  const handleSearchTrack = handleSubmit((data) => {
    navigate({
      pathname: path.tracks,
      search: createSearchParams({
        ...queryConfig,
        departureStation: data.departureStation,
        arrivalStation: data.arrivalStation,
        departureTime: `${departureTime.toISOString().replaceAll("/", "-").slice(0, 10)} 00:00:00`,
        returnTime: `${returnTime.toISOString().replaceAll("/", "-").slice(0, 10)} 23:59:59`,
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
      {tracksData && tracksData?.length > 0 ? (
        <div>
          <div className="container pt-48">
            {tracksQueryIsLoading && !tracksData && <SkeletonLoading></SkeletonLoading>}
            {!tracksQueryIsLoading &&
              tracksData &&
              tracksData.map((track) => (
                <Track
                  track={track}
                  key={track.id}
                ></Track>
              ))}
          </div>
        </div>
      ) : (
        <div className="container pt-48 text-center text-lg font-medium">
          {tracksQueryIsLoading ? <SkeletonLoading></SkeletonLoading> : <span>Không tìm thấy chuyến đi nào!</span>}
        </div>
      )}
    </>
  );
};

export default TrackPage;
