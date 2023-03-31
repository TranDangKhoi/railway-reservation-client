import { QueryConfigType } from "src/types/query.types";
import { SuccessApiResponseType } from "src/types/response.types";
import { TrackType } from "src/types/track.types";
import http from "src/utils/http";

const trackApi = {
  findTracks: (params: QueryConfigType) =>
    http.get<SuccessApiResponseType<TrackType[]>>(`/track/find`, {
      params,
    }),
  getTrackDetailsById: (trackId: number) => http.get<SuccessApiResponseType<TrackType>>(`/track/bytrackid/${trackId}`),
};

export default trackApi;
