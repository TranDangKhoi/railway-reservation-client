import { TrainIcon } from "src/components/Icon";
import ArrowDownIcon from "src/components/Icon/ArrowDownIcon";
import ModalTab from "./components/ModalTab";
const Homepage = () => {
  return (
    <div className="relative h-[630px] w-full bg-homepageBackground bg-cover bg-bottom-center-4 bg-no-repeat">
      <h2 className="absolute top-40 left-12 w-[487px] text-6xl font-bold">Book With Us And Enjoy your Journey !</h2>
      <div className="absolute top-[400px] left-1/2 w-[1000px] -translate-x-1/2 rounded-md bg-white py-3 px-4">
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
                  iconComponent={<TrainIcon></TrainIcon>}
                >
                  Đặt vé
                </ModalTab>
                <ModalTab
                  containerClassName="flex items-center gap-x-2"
                  iconComponent={<TrainIcon></TrainIcon>}
                >
                  Đặt vé
                </ModalTab>
              </div>
              <button className="flex items-center gap-x-2">
                <span className="font-medium">Một chiều</span>
                <ArrowDownIcon
                  fill="#84878B"
                  kind="primary"
                ></ArrowDownIcon>
              </button>
            </div>
            <div className=""></div>
          </div>
          <div className="flex-shrink-0">
            <button className="rounded-lg bg-blue-600 px-5 py-4 font-medium text-white">Tìm kiếm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
