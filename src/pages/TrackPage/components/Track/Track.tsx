import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, TrainIcon } from "src/components/Icon";
import { TrackType } from "src/types/track.types";
import { displayDayOfTheWeek, displayEnGBDate } from "src/utils/formatDate";
import { generateSlug } from "src/utils/slugify";
import TrackMeta from "../TrackMeta";

type TrackPropsType = {
  track: TrackType;
};

const Track = ({ track }: TrackPropsType) => {
  const navigate = useNavigate();
  return (
    <div className="&:not(first-of-type:mt-5) rounded-lg border-2 border-primaryGray bg-white py-4 px-10 shadow-md">
      <div className="border-b-[1px] border-b-tertiaryGray pb-5">
        <div className="flex flex-col items-start gap-x-2 sm:flex-row">
          <div className="flex items-center gap-x-2">
            <div className="text-lg font-medium">{track.departureStation}</div>
            <ArrowRightIcon
              width={17}
              height={12}
            ></ArrowRightIcon>
            <div className="text-lg font-medium">{track.arrivalStation}</div>
          </div>
          <div className="text-lg font-medium">
            {displayDayOfTheWeek(track.departureTime)}, {displayEnGBDate(track.departureTime)}
          </div>
        </div>
        <div className="mt-7 block items-start justify-between lg:flex">
          <div className="hidden grid-cols-5 gap-x-6 lg:grid">
            <div className="relative col-span-1 flex h-[65px] w-[60px] items-center justify-center bg-sendoTrainBackground bg-contain bg-no-repeat">
              <div className="text-[15px] font-bold">{track.train.name}</div>
            </div>
            <TrackMeta
              track={track}
              type="departure"
            ></TrackMeta>
            <div className="relative col-span-2 flex items-center justify-center">
              <div className="absolute top-1/2 -translate-y-1/2">
                <div className="flex h-[67px] w-[157px] items-center justify-center gap-x-3 bg-dashLineBackground bg-contain bg-no-repeat">
                  <TrainIcon
                    fill="#3B71FE"
                    className="h-5 w-5"
                    kind="secondary"
                  ></TrainIcon>
                </div>
              </div>
            </div>
            <TrackMeta
              track={track}
              type="arrival"
            ></TrackMeta>
          </div>
          <div className="grid grid-cols-3 lg:hidden">
            <TrackMeta
              track={track}
              type="departure"
            ></TrackMeta>
            <div className="relative col-span-1 flex items-center justify-center">
              <div className="absolute top-1/2 -translate-y-1/2">
                <div className="flex h-[67px] w-max items-center justify-center gap-x-3 bg-contain bg-no-repeat lg:w-[157px] lg:bg-dashLineBackground">
                  <TrainIcon
                    fill="#3B71FE"
                    className="h-5 w-5"
                    kind="secondary"
                  ></TrainIcon>
                </div>
              </div>
            </div>
            <TrackMeta
              track={track}
              type="arrival"
            ></TrackMeta>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center lg:mt-0">
            <span className="text-sm font-medium sm:text-base">
              {track.train.totalFreeSeats}/{track.train.totalSeats} chỗ trống
            </span>
            <button
              onClick={() =>
                navigate(
                  `/${generateSlug({
                    departureStation: track.departureStation,
                    arrivalStation: track.arrivalStation,
                    id: track.id,
                  })}`,
                )
              }
              className="w-full rounded-full bg-primary px-5 py-4 font-medium text-white"
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
