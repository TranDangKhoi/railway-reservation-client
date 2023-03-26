export type TrackType = {
  id: number;
  departureStation: string;
  departureTime: string;
  arrivalStation: string;
  arrivalTime: string;
  trainId: number;
  train: {
    id: number;
    name: string;
    carriages: {
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

export type CarriageType = {
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
};
