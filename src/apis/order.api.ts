import { OrderType } from "src/types/order.types";
import { SuccessApiResponseType } from "src/types/response.types";
import http from "src/utils/http";

const orderApi = {
  getAllOrders: () => http.get<SuccessApiResponseType<OrderType[]>>("/order"),
  placeOrder: (body: OrderType) =>
    http.post("/order", body, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
};

export default orderApi;
