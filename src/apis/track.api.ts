import { QueryConfigType } from "src/types/query.types";
import http from "src/utils/http";

const trackApi = {
  findTracks: (params: QueryConfigType) =>
    http.get(`/track/find`, {
      params,
    }),
};

export default trackApi;
