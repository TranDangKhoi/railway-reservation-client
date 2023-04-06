import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import orderApi from "src/apis/order.api";
import { AuthContext } from "src/contexts/auth.context";
import { displayEnGBDateAndTime } from "src/utils/formatDate";
import { formatCurrency } from "src/utils/formatNumber";

const OrdersPage = () => {
  const { userProfile } = useContext(AuthContext);
  const { data: orderHistoryQueryData } = useQuery({
    queryKey: ["orders", { userId: userProfile?.id }],
    queryFn: () => orderApi.getAllOrdersByUserId(userProfile?.id as string),
  });
  const orderHistory = orderHistoryQueryData?.data.data;
  console.log(orderHistory);
  return (
    <div className="container mt-10">
      <h2 className="text-center text-3xl font-bold">Lịch sử giao dịch</h2>
      <table className="w-full">
        <thead>
          <tr className="border border-primary bg-primary p-2 text-center font-medium text-white">
            <td className="p-5">Mã giao dịch</td>
            <td className="p-5">Tên người thanh toán</td>
            <td className="p-5">Tổng tiền</td>
            <td className="p-5">Thời gian giao dịch</td>
            <td className="p-5">Chi tiết</td>
          </tr>
        </thead>
        <tbody>
          {orderHistory?.map((orderHistory) => (
            <tr
              className="h-[50px] border border-black bg-white text-center text-black"
              key={orderHistory.orderHeaderId}
            >
              <td>{orderHistory.orderHeaderId}</td>
              <td>{orderHistory.pickupName}</td>
              <td>{formatCurrency(orderHistory.orderTotal)} VNĐ</td>
              <td>{displayEnGBDateAndTime(orderHistory.orderDate)}</td>
              <td>Xem chi tiết</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
