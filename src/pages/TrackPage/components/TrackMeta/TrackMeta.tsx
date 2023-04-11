import React from "react";
import { TrackType } from "src/types/track.types";
import { displayEnGBDateAndTime } from "src/utils/formatDate";

type TrackMetaPropsType = {
  track: TrackType;
  type: "departure" | "arrival" | "return";
};

const TrackMeta = ({ track, type }: TrackMetaPropsType) => {
  return (
    <div className="col-span-1 flex flex-col items-start justify-start">
      {type === "departure" && (
        <>
          <div className="text-lg font-bold line-clamp-1 lg:text-xl">{track.departureStation}</div>
          <div className="hidden text-base font-medium lg:block">Thời gian đi:</div>
          <span className="text-xs font-medium text-secondaryGray lg:text-base">
            {displayEnGBDateAndTime(track.departureTime)}
          </span>
        </>
      )}
      {type === "arrival" && (
        <>
          <div className="text-lg font-bold line-clamp-1 lg:text-xl">{track.arrivalStation}</div>
          <div className="hidden text-base font-medium lg:block">Thời gian tới:</div>
          <span className="text-xs font-medium text-secondaryGray lg:text-base">
            {displayEnGBDateAndTime(track.arrivalTime)}
          </span>
        </>
      )}
    </div>
  );
};

export default TrackMeta;
