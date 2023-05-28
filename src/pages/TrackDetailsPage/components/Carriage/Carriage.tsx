import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import carriageApi from "src/apis/carriage.api";
import CarriageIcon from "src/assets/images/Carriage.png";
import Locomotive from "src/assets/images/Locomotive.png";
import Popover from "src/components/Popover";
import { CarriageType } from "src/types/track.types";
import Seat from "../Seat";
type CarriagePropsType = {
  carriages: CarriageType[];
};

const Carriage = ({ carriages }: CarriagePropsType) => {
  const [carriageIdState, setCarriageIdState] = useState(carriages[0].id);
  const {
    data: carriageDetailsQueryData,
    refetch,
    isLoading: carriageDetailsIsLoading,
  } = useQuery({
    queryKey: ["carriageDetails", { carriageId: carriageIdState }],
    queryFn: () => carriageApi.getCarriageDetailsById(carriageIdState),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
  });
  const carriage = carriageDetailsQueryData?.data.data;
  const handleSelectCarriage = (carriageId: number) => {
    setCarriageIdState(carriageId);
    refetch({ queryKey: ["carriageDetails", { carriageId: carriageIdState }] });
  };
  return (
    <>
      <div className="mt-5 flex flex-row-reverse items-start justify-end">
        <div className="h-6 w-14 cursor-pointer">
          <img
            src={Locomotive}
            alt="Đầu tàu"
          />
        </div>
        {carriages.map((carriage) => (
          <Popover
            renderPopover={
              <span className="block w-32 bg-black bg-opacity-70 p-1 text-center text-xs text-white">
                Toa {carriage.carriageNo}: {carriage.carriageType.name}
              </span>
            }
            placement="top"
            enableArrow={false}
            offsetPx={5}
            key={carriage.id}
          >
            <div className="flex flex-col items-center gap-y-2">
              <div
                className={classNames(
                  "relative h-6 w-14 cursor-pointer rounded-lg",
                  {
                    "bg-green-400 hover:bg-green-400": carriage.id === carriageIdState,
                  },
                  {
                    "bg-secondaryGray hover:bg-primary": carriage.id !== carriageIdState,
                  },
                )}
                onClick={() => handleSelectCarriage(carriage.id)}
                aria-hidden
              >
                <img
                  src={CarriageIcon}
                  alt="Toa"
                  className="absolute top-full z-10 h-full w-full -translate-y-[20px]"
                />
              </div>
              <span className="text-xs">Toa {carriage.carriageNo}</span>
            </div>
          </Popover>
        ))}
      </div>
      <div className="mt-7 flex flex-col items-center justify-center">
        <h4 className="text-lg font-medium text-primary">
          Toa số {carriage?.carriageNo}: {carriage?.carriageType.name}
        </h4>
        <div className="h-max w-full rounded-lg border-2 border-gray-400 p-4">
          {carriageDetailsIsLoading && (
            <div className="flex flex-col items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <span className="text-base font-medium">Đang lấy dữ liệu của toa...</span>
            </div>
          )}
          <div className="grid grid-cols-10 gap-1">
            {!carriageDetailsIsLoading &&
              carriage?.seats &&
              carriage.seats.map((seat) => (
                <Seat
                  seat={seat}
                  key={seat.id}
                ></Seat>
              ))}
          </div>
          {!carriageDetailsIsLoading && carriage?.seats && carriage.seats.length <= 0 && (
            <div className="flex items-center justify-center text-xl font-medium text-primary">
              Không có dữ liệu của toa này
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Carriage;
