import { ApplicationUserType } from "./user.types";

export type OrderRequestType = {
  orderHeaderId: number;
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  applicationUserId: string;
  orderTotal: number;
  stripePaymentIntentID: string;
  status: string;
  totalItems: number;
  orderDetailsDTO: OrderDetailsDtoType[];
};

export type OrderDetailsDtoType = {
  seatId: number;
  price: number;
};

export type OrderType = {
  orderHeaderId: number;
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  applicationUserId: string;
  orderTotal: number;
  orderDate: string;
  stripePaymentIntentID: string;
  status: string;
  totalItems: number;
  orderDetails: OrderDetailType[];
};

export type OrderDetailType = {
  orderDetailId: number;
  orderHeaderId: number;
  seatId: number;
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
  orderDetails: OrderDetailType[];
};
