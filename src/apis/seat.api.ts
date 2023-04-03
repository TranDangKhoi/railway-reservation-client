import { SeatType } from "src/types/track.types";
import http from "src/utils/http";

const seatApi = {
  updateSeatStatusById: (body: { seatStatus: number; id: number }) => http.put<SeatType>("/seat", body),
};

export default seatApi;
