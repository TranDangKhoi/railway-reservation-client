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
          <div className="text-xl font-bold">{track.departureStation}</div>
          <div className="text-base font-medium">Thời gian đi:</div>
          <span className="text-base font-medium text-secondaryGray">
            {displayEnGBDateAndTime(track.departureTime)}
          </span>
        </>
      )}
      {type === "arrival" && (
        <>
          <div className="text-xl font-bold">{track.arrivalStation}</div>
          <div className="text-base font-medium">Thời gian tới:</div>
          <span className="text-base font-medium text-secondaryGray">{displayEnGBDateAndTime(track.arrivalTime)}</span>
        </>
      )}
      {type === "return" && (
        <>
          <div className="text-xl font-bold">{track.departureStation}</div>
          <div className="text-base font-medium">Thời gian về:</div>
          <span className="text-base font-medium text-secondaryGray">{displayEnGBDateAndTime(track.returnTime)}</span>
        </>
      )}
    </div>
  );
};

export default TrackMeta;
