import { OrderHistoryType, OrderRequestType, OrderType } from "src/types/order.types";
import { SuccessApiResponseType } from "src/types/response.types";
import http from "src/utils/http";

const orderApi = {
  getAllOrders: () => http.get<SuccessApiResponseType<OrderRequestType[]>>("/order"),
  getAllOrdersByUserId: (userId: string) =>
    http.get<SuccessApiResponseType<OrderHistoryType[]>>(`order/by-user-id/${userId}`),
  getOrderDetailByOrderId: (orderId: number) =>
    http.get<SuccessApiResponseType<OrderHistoryType>>(`order/by-order-id/${orderId}`),
  placeOrder: (body: OrderRequestType) =>
    http.post("/order", body, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
};

export default orderApi;
