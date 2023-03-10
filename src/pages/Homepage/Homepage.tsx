import { TrainIcon } from "src/components/Icon";
const Homepage = () => {
  return (
    <div className="relative h-[630px] w-full bg-homepageBackground bg-cover bg-bottom-center-4 bg-no-repeat">
      <h2 className="absolute top-40 left-12 w-[487px] text-6xl font-bold">Book With Us And Enjoy your Journey !</h2>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white py-3 px-4">
        <div className="flex">
          <div className="left flex flex-col gap-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-2">
                  <TrainIcon></TrainIcon>
                  <span className="font-medium">Tàu hỏa</span>
                </div>
              </div>
              <div className="flex-items-center gap-x-2"></div>
            </div>
            <div></div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
