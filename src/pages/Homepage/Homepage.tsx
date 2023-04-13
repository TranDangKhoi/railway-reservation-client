import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import provinceApi from "src/apis/province.api";
import { ArrowDownIcon, ReturnTicketIcon, TicketIcon, TrainIcon } from "src/components/Icon";
import Popover from "src/components/Popover";
import { path } from "src/constants/path.enum";
import useQueryConfig from "src/hooks/useQueryConfig";
import { trackSearchSchema, TrackSearchType } from "src/schemas/schemas";
import ModalSelect from "./components/ModalSelect";
import ModalSelectDate from "./components/ModalSelectDate";
import ModalTab from "./components/ModalTab";

type FormDataType = TrackSearchType;

const Homepage = () => {
  const [departureTime, setDepartureTime] = useState<Date>(new Date());
  const { t } = useTranslation("homepage");
  // Nếu dùng nhiều namespace thì truyền vào một cái array
  // vd:
  // const { t } = useTranslation(["homepage", "navbar"]);
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
    reValidateMode: "onChange",
    mode: "onChange",
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
    <div className="relative h-[630px] w-full bg-homepageBackground bg-cover bg-bottom-center-4 bg-no-repeat">
      <h2 className="absolute top-5 left-1/2 w-max -translate-x-1/2 font-secondary text-2xl font-bold text-white lg:top-36 lg:left-12 lg:w-[487px] lg:translate-x-0 lg:text-6xl lg:leading-[70px]">
        Travel With Us And Enjoy your Journey !
      </h2>
      <form
        onSubmit={handleSearchTrack}
        className="absolute top-1/2 left-1/2 w-[400px] -translate-y-1/2 -translate-x-1/2 rounded-md bg-white py-3 pl-8 pr-6 shadow-shadow1 sm:py-5 sm:pl-12 sm:pr-10 lg:top-[400px] lg:w-[1000px] lg:translate-y-[100px] xl:w-[1170px]"
      >
        <div className="flex flex-col justify-between gap-x-5 lg:flex-row">
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex items-center justify-center border-b-[3px] border-b-input pb-5 lg:justify-between">
              <div className="flex items-center gap-x-4 lg:justify-start">
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={<TrainIcon className="h-4 w-4"></TrainIcon>}
                >
                  {t("ticket book")}
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
                  {t("ticket find")}
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
                  {t("ticket return")}
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
                  <span className="font-medium">{t("one-way")}</span>
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
                title={t("departure station") as string}
                subtitle={t("departure select") as string}
                colSpan={2}
                provincesData={provincesData}
                errorMsg={errors.departureStation?.message}
                inputPlaceholder="Tìm kiếm ga..."
                name="departureStation"
                handleSelectOption={handleSelectOption}
              ></ModalSelect>
              <ModalSelect
                title={t("arrival station") as string}
                subtitle={t("arrival select") as string}
                arrowIconBefore={true}
                errorMsg={errors.arrivalStation?.message}
                colSpan={2}
                name="arrivalStation"
                provincesData={provincesData}
                handleSelectOption={handleSelectOption}
              ></ModalSelect>
              <ModalSelectDate
                departureTime={departureTime}
                title={t("departure time") as string}
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
              {t("search")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Homepage;
