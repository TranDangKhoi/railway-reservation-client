import { ApplicationUserType } from "./user.types";

export type OrderType = {
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  applicationUserId: string;
  orderTotal: number;
  stripePaymentIntentID: string;
  status: string;
  totalItems: number;
  orderDetailsDTO: OrderDetailType[];
};
export type OrderDetailType = {
  seatId: number;
  price: number;
};
export type OrderHistoryType = {
  orderHeaderId: number;
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  applicationUserId: string;
  applicationUser: ApplicationUserType;
  orderTotal: number;
  orderDate: string;
  stripePaymentIntentID: string;
  status: string;
  totalItems: number;
  orderDetails: {
    orderDetailId: 15;
    orderHeaderId: 9;
    seatId: 111;
    seat: {
      id: number;
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
    price: 600000;
  }[];
};
