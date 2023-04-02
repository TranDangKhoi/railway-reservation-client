export type PaymentType = {
  id: number;
  userId: string;
  cartItems: {
    id: number;
    seatId: number;
    seat: {
      id: number;
      seatNo: number;
      seatPrice: number;
      seatStatus: number;
      carriageId: number;
      carriage: null;
    };
    shoppingCartId: number;
  }[];
  cartTotal: number;
  stripePaymentIntentId: string;
  clientSecret: string;
};
