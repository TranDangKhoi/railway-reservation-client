import { ArrowDownIcon, ReturnTicketIcon, TicketIcon, TrainIcon } from "src/components/Icon";
import Popover from "src/components/Popover";
import ModalSelect from "./components/ModalSelect";
import ModalTab from "./components/ModalTab";
const Homepage = () => {
  return (
    <div className="relative h-[430px] w-full bg-homepageBackground bg-cover bg-bottom-center-4 bg-no-repeat sm:h-[630px]">
      <h2 className="absolute top-36 left-12 w-[300px] font-secondary font-bold text-white sm:block sm:text-4xl lg:w-[487px] lg:text-6xl lg:leading-[70px]">
        Travel With Us And Enjoy your Journey !
      </h2>
      <div className="absolute top-full left-1/2 w-[400px] translate-y-[100px] -translate-x-1/2 rounded-md bg-white py-5 px-12 shadow-shadow1 sm:w-[500px] lg:top-[400px] lg:w-[900px] xl:w-[1170px]">
        <div className="flex justify-between gap-x-5">
          <div className="left flex w-full flex-col gap-y-3">
            <div className="flex items-center justify-between border-b-[3px] border-b-input pb-5">
              <div className="flex items-center gap-x-4">
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
                <button className="flex items-center gap-x-2">
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
            <div className="mt-5 grid grid-cols-5 gap-x-2">
              <ModalSelect
                title="Ga đi"
                subtitle="Chọn ga đi"
                colSpan={2}
              ></ModalSelect>
              <ModalSelect
                title="Ga đến"
                subtitle="Chọn ga đến"
                arrowIconBefore={true}
              ></ModalSelect>
              <ModalSelect
                title="Ngày đi"
                subtitle="Chọn ngày đi"
                arrowIconBefore={true}
              ></ModalSelect>
              <ModalSelect
                title="Ngày về"
                subtitle="Chọn ngày về"
                arrowIconBefore={true}
              ></ModalSelect>
            </div>
          </div>
          <div className="flex-shrink-0 self-end">
            <button className="rounded-lg bg-primary px-7 py-6 font-medium text-white transition-all duration-150 hover:bg-hover">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
