import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import trackApi from "src/apis/track.api";
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
    <div className="small-container w-full bg-white px-2 py-3">
      <h2 className="flex w-max items-center gap-x-2 rounded-r-lg bg-primary py-2 px-3 text-white">
        <strong className="text-base font-bold">Chiều đi:</strong>
        <span className="text-base font-medium">
          ngày {displayEnGBDate(track.departureTime)} từ {track.departureStation} đến {track.arrivalStation}
        </span>
      </h2>
      <Carriage carriages={track?.train?.carriages}></Carriage>
    </div>
  );
};

export default TrackDetailsPage;
