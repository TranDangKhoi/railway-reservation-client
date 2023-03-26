import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";
import carriageApi from "src/apis/carriage.api";
import CarriageIcon from "src/assets/images/Carriage.png";
import Locomotive from "src/assets/images/Locomotive.png";
import Popover from "src/components/Popover";
import { CarriageType } from "src/types/track.types";
type CarriagePropsType = {
  carriages: CarriageType[];
  // handleSelectCarriage: (carriageId: number) => void;
};

const Carriage = ({ carriages }: CarriagePropsType) => {
  const [carriageIdState, setCarriageIdState] = useState(carriages[0].id);
  const { data: carriageDetailsQueryData, refetch } = useQuery({
    queryKey: ["carriageDetails", { carriageId: carriageIdState }],
    queryFn: () => carriageApi.getCarriageDetailsById(carriageIdState),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
  });
  const carriage = carriageDetailsQueryData?.data;
  const handleSelectCarriage = (carriageId: number) => {
    setCarriageIdState(carriageId);
    refetch({ queryKey: ["carriageDetails", { carriageId: carriageIdState }] });
  };
  console.log(carriageDetailsQueryData);
  return (
    <>
      <div className="mt-8 flex flex-row-reverse items-start justify-end">
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
                  "relative h-6 w-14 cursor-pointer rounded-lg hover:bg-primary",
                  {
                    "bg-primary": carriage.id === carriageIdState,
                  },
                  {
                    "bg-secondaryGray": carriage.id !== carriageIdState,
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
      <div className="mt-5 flex flex-col items-center justify-center">
        <h4 className="text-lg font-medium text-primary">
          Toa số {carriage?.carriageNo}: {carriage?.carriageType.name}
        </h4>
        <div className="h-max w-full rounded-lg border-2 border-gray-300 p-4">
          <div className="grid grid-cols-14 gap-1">
            {carriage?.seats &&
              carriage.seats.map((seat) => (
                <div
                  className="ml-2 h-5 w-5 rounded-md border border-black bg-white"
                  key={seat.id}
                ></div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carriage;
