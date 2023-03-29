import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import trackApi from "src/apis/track.api";
import { BasketIcon } from "src/components/Icon";
import { displayEnGBDate } from "src/utils/formatDate";
import { getIdFromSlug } from "src/utils/slugify";
import Carriage from "./components/Carriage";

const TrackDetailsPage = () => {
  const { trackId: slug } = useParams();
  const trackId = getIdFromSlug(slug as string);
  const { data: trackDetailsQueryData } = useQuery({
    queryKey: ["trackDetails", { trackId }],
    queryFn: () => trackApi.getTrackDetailsById(trackId),
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
  });
  const track = trackDetailsQueryData?.data;

  if (!track) return null;
  return (
    <div className="small-container grid w-full grid-cols-3 gap-x-2 bg-white px-2 py-3">
      <div className="col-span-2">
        <h2 className="flex w-max items-center gap-x-2 rounded-r-lg bg-primary py-2 px-3 text-white">
          <strong className="text-base font-bold">Chiều đi:</strong>
          <span className="text-base font-medium">
            ngày {displayEnGBDate(track.departureTime)} từ {track.departureStation} đến {track.arrivalStation}
          </span>
        </h2>
        <Carriage carriages={track?.train?.carriages}></Carriage>
      </div>
      <div className="col-span-1">
        <h2 className="flex items-center gap-x-2 bg-secondaryGray py-2 px-3 text-base font-bold text-white">
          <span>Giỏ vé</span>
          <BasketIcon
            width={18}
            height={18}
            fill="white"
          ></BasketIcon>
        </h2>
      </div>
    </div>
  );
};

export default TrackDetailsPage;
