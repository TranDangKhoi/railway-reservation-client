export type TrackType = {
  id: number;
  departureStation: string;
  departureTime: string;
  arrivalStation: string;
  arrivalTime: string;
  returnTime: string;
  trainId: number;
  train: {
    id: number;
    name: string;
    trainCarriages: {
      id: number;
      carriageNo: number;
      seats: {
        id: number;
        seatPrice: number;
        seatStatus: number;
        carriageId: number;
      }[];
      carriageTypeId: number;
      carriageType: {
        id: number;
        name: string;
      };
      totalSeats: number;
    }[];
    totalCarriages: number;
    totalFreeSeats: number;
    totalReservedSeats: number;
    totalSeats: number;
  };
};
