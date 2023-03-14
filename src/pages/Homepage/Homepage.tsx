import { ArrowDownIcon, LockIcon, ReturnTicketIcon, TrainIcon } from "src/components/Icon";
import ModalTab from "./components/ModalTab";
const Homepage = () => {
  return (
    <div className="relative h-[430px] w-full bg-homepageBackground bg-cover bg-bottom-center-4 bg-no-repeat sm:h-[630px]">
      <h2 className="absolute top-36 left-12 w-[300px] font-primary font-bold text-white sm:block sm:text-4xl lg:w-[487px] lg:text-6xl lg:leading-[70px]">
        Travel With Us And Enjoy your Journey !
      </h2>
      <div className="absolute top-[300px] left-1/2 w-[400px] -translate-x-1/2 rounded-md bg-white py-3 px-4 sm:w-[500px] lg:top-[400px] lg:w-[900px] xl:w-[1000px]">
        <div className="flex justify-between gap-x-5">
          <div className="left flex w-full flex-col gap-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={<TrainIcon></TrainIcon>}
                >
                  Đặt vé
                </ModalTab>
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={<LockIcon pathClassName="fill-black"></LockIcon>}
                >
                  Tra cứu vé
                </ModalTab>
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={<ReturnTicketIcon fill="black"></ReturnTicketIcon>}
                >
                  Trả vé
                </ModalTab>
              </div>
              <button className="flex items-center gap-x-2">
                <span className="font-medium">Một chiều</span>
                <ArrowDownIcon
                  width={11}
                  height={10}
                  fill="#84878B"
                  kind="primary"
                ></ArrowDownIcon>
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button className="rounded-lg bg-primary px-5 py-4 font-medium text-white transition-all duration-150 hover:bg-hover">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
