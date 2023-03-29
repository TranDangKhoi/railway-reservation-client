import { CartType } from "src/types/cart.types";
import http from "src/utils/http";

const cartApi = {
  getCart: (params: { userId: string }) =>
    http.get<CartType>("/cart/get-cart", {
      params,
    }),
  addToCart: (body: { userId: string; seatId: number }) => http.post("/cart/add-to-cart", body),
};

export default cartApi;
