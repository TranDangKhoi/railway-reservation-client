export type OrderType = {
  pickupName: string;
  pickupPhoneNumber: string;
  pickupEmail: string;
  applicationUserId: string;
  orderTotal: number;
  stripePaymentIntentID: string;
  status: string;
  totalItems: number;
  orderDetailsDTO: {
    seatId: number;
    price: number;
  }[];
};
// export type OrderDetailType = {};
