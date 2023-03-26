import { CarriageType } from "src/types/track.types";
import http from "src/utils/http";

const carriageApi = {
  getCarriageDetailsById: (carriageId: number) => http.get<CarriageType>(`/carriage/${carriageId}`),
};

export default carriageApi;
