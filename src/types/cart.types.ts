export type CartType = {
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
    };
    shoppingCartId: number;
  }[];
  cartTotal: number;
  stripePaymentIntentId: null;
  clientSecret: null;
};
