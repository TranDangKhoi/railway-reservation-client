import { CarriageType } from "src/types/track.types";
import http from "src/utils/http";

const seatApi = {
  getCarriageDetailsById: (carriageId: number) => http.get<CarriageType>(`/seat/${carriageId}`),
};

export default seatApi;
