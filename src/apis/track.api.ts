import { QueryConfigType } from "src/types/query.types";
import { TrackType } from "src/types/track.types";
import http from "src/utils/http";

const trackApi = {
  findTracks: (params: QueryConfigType) =>
    http.get<TrackType[]>(`/track/find`, {
      params,
    }),
  getTrackDetailsById: (trackId: number) => http.get<TrackType>(`/track/bytrackid/${trackId}`),
};

export default trackApi;
