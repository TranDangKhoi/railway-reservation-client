import { OrderHistoryType, OrderRequestType, OrderType } from "src/types/order.types";
import { SuccessApiResponseType } from "src/types/response.types";
import http from "src/utils/http";

const orderApi = {
  getAllOrders: () => http.get<SuccessApiResponseType<OrderHistoryType[]>>("/order"),
  getAllOrdersByUserId: (userId: string) =>
    http.get<SuccessApiResponseType<OrderHistoryType[]>>(`order/by-user-id/${userId}`),
  getOrderDetailByOrderId: (orderId: number) =>
    http.get<SuccessApiResponseType<OrderHistoryType>>(`order/by-order-id/${orderId}`),
  placeOrder: (body: Omit<OrderRequestType, "orderHeaderId">) => http.post("/order", body),
  updateOrderStatus: (body: Pick<OrderRequestType, "status" | "orderHeaderId">) =>
    http.put(`order/update-status`, body),
};

export default orderApi;
