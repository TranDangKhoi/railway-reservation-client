export type CartType = {
  id: number;
  userId: string;
  cartItems: {
    id: number;
    seat: {
      seatNo: number;
      seatPrice: number;
      seatStatus: number;
      carriageId: number;
      carriage: {
        carriageNo: number;
        carriageType: {
          id: number;
          name: string;
        };
        train: {
          id: number;
          name: string;
          track: {
            id: number;
            departureStation: string;
            departureTime: string;
            arrivalStation: string;
            arrivalTime: string;
          };
          totalCarriages: number;
          totalFreeSeats: number;
          totalReservedSeats: number;
          totalSeats: number;
        };
      };
    };
    shoppingCartId: number;
  }[];
  cartTotal: number;
};
