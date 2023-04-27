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
import { trackSearchSchema, TrackSearchType } from "src/schemas/schemas";
import ModalSelect from "../Homepage/components/ModalSelect";
import ModalSelectDate from "../Homepage/components/ModalSelectDate";
import ModalTab from "../Homepage/components/ModalTab";
import Track from "./components/Track";

type FormDataType = TrackSearchType;

const TrackPage = () => {
  const [departureTime, setDepartureTime] = useState<Date>(new Date("2023-04-20T00:00:00.000Z"));
  const queryConfig = useQueryConfig();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      departureTime: departureTime.toString(),
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
  const tracksData = tracksQueryData?.data.data;
  const handleSearchTrack = handleSubmit((data) => {
    navigate({
      pathname: path.tracks,
      search: createSearchParams({
        ...queryConfig,
        departureStation: data.departureStation,
        arrivalStation: data.arrivalStation,
        departureTime: `${departureTime
          .toLocaleDateString("pt-br")
          .split("/")
          .reverse()
          .join("-")
          .replaceAll("/", "-")
          .slice(0, 10)}`,
      }).toString(),
    });
  });
  const provincesData = provincesQueryData?.data.map((province) =>
    province.name.replace("Tỉnh", "").replace("Thành phố", "").trim(),
  );
  return (
    <>
      <div className="relative h-[630px] w-full bg-gray-200 bg-cover bg-bottom-center-4 bg-no-repeat lg:h-[270px]">
        <div className="absolute top-8 left-8 flex items-center gap-x-2 text-sm">
          <Link to={path.homepage}>Trang chủ</Link>
          <span>{">"}</span>
          <span className="cursor-pointer text-secondaryGray">Tìm chuyến đi</span>
        </div>
        <form
          onSubmit={handleSearchTrack}
          className="absolute top-1/2 left-1/2 w-full max-w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-md bg-white py-3 pl-8 pr-6 shadow-shadow1 sm:max-w-[500px] sm:py-5 sm:pl-12 sm:pr-10 lg:top-[300px] lg:max-w-[1000px] xl:max-w-[1170px]"
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
                        Một chiều
                      </button>
                      <button className="block w-full py-3 pl-4 pr-20 text-left hover:bg-secondaryGray hover:bg-opacity-40">
                        Khứ hồi
                      </button>
                    </div>
                  }
                >
                  <button className="hidden items-center gap-x-2 lg:flex">
                    <span className="font-medium">Một chiều</span>
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
                  errorMsg={errors.departureStation?.message}
                  inputPlaceholder="Tìm kiếm ga..."
                  name="departureStation"
                  handleSelectOption={handleSelectOption}
                ></ModalSelect>
                <ModalSelect
                  title="Ga đến"
                  subtitle="Chọn ga đến"
                  arrowIconBefore={true}
                  errorMsg={errors.arrivalStation?.message}
                  colSpan={2}
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
                  extendOnMobile
                  colSpan={2}
                  setDepartureTime={setDepartureTime}
                  handleSelectOption={handleSelectOption}
                ></ModalSelectDate>
              </div>
            </div>
            <div className="flex-shrink-0 lg:self-end">
              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-primary px-7 py-6 font-medium text-white transition-all duration-150 hover:bg-hover lg:mt-0"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>
      </div>
      {tracksData && tracksData?.length > 0 ? (
        <div>
          <div className="container pt-10 lg:pt-48">
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
        <div className="container pt-10 text-center text-lg font-medium lg:pt-48">
          {tracksQueryIsLoading ? <SkeletonLoading></SkeletonLoading> : <span>Không tìm thấy chuyến đi nào!</span>}
        </div>
      )}
    </>
  );
};

export default TrackPage;
