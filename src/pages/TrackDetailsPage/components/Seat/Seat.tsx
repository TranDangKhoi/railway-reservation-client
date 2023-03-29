import classNames from "classnames";
import React from "react";
import Popover from "src/components/Popover";
import { seatStatus } from "src/constants/seatStatus.enum";
import { SeatType } from "src/types/track.types";
import { formatCurrency } from "src/utils/formatNumber";

type SeatPropsType = {
  seat: SeatType;
};

const Seat = ({ seat }: SeatPropsType) => {
  return (
    <Popover
      renderMethod="hover"
      enableArrow={false}
      offsetPx={5}
      renderPopover={
        <div className="rounded-lg bg-white shadow-shadow1">
          {seat.seatStatus === seatStatus.free ? (
            <>
              <h5 className="block w-full bg-tertiaryGray py-3 pl-2 pr-20 text-left text-sm text-black">Chỗ trống</h5>
              <div className="my-2 ml-2 flex items-center gap-x-2 pb-2">
                <span className="text-base font-bold">Giá:</span>
                <span className="font-tertiary text-sm">{formatCurrency(seat.seatPrice)} VNĐ</span>
              </div>
            </>
          ) : (
            <>
              <h5 className="block w-full bg-red-500 py-3 pl-2 pr-20 text-left text-sm text-white">Chỗ đã bán</h5>
              <div className="my-2 ml-2 pb-2 font-tertiary text-sm">Chỗ đã bán 🚫</div>
            </>
          )}
        </div>
      }
      placement="top-start"
    >
      <div
        className={classNames(
          "carriage-seat relative ml-2 flex h-4 w-4 items-center justify-center rounded-md border border-black p-3",
          {
            "cursor-not-allowed bg-red-500 text-white": seat.seatStatus === seatStatus.reserved,
          },
          {
            "cursor-pointer bg-white text-black": seat.seatStatus === seatStatus.free,
          },
        )}
      >
        <span className="text-sm">{seat.seatNo}</span>
      </div>
    </Popover>
  );
};

export default Seat;