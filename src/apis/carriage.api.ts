import { SuccessApiResponseType } from "src/types/response.types";
import { CarriageType } from "src/types/track.types";
import http from "src/utils/http";

const carriageApi = {
  getCarriageDetailsById: (carriageId: number) =>
    http.get<SuccessApiResponseType<CarriageType>>(`/carriage/${carriageId}`),
};

export default carriageApi;
