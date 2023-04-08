import { CartType } from "src/types/cart.types";
import { SuccessApiResponseType } from "src/types/response.types";
import http from "src/utils/http";

const cartApi = {
  getCart: (params: { userId: string }) =>
    http.get<SuccessApiResponseType<CartType>>("/cart/get-cart", {
      params,
    }),
  addToCart: (body: { userId: string; seatId: number }) =>
    http.post<SuccessApiResponseType<CartType>>("/cart/add-to-cart", body),
  removeFromCart: (params: { cartItemId: number; userId: string }) => http.delete("/cart/remove-from-cart", { params }),
};

export default cartApi;
