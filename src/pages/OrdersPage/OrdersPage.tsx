import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import orderApi from "src/apis/order.api";
import Breadcrumb from "src/components/Breadcrumb";
import Table from "src/components/Table";
import { orderStatus } from "src/constants/orderStatus.enum";
import { path } from "src/constants/path.enum";
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
  return (
    <div className="container mt-10">
      <Breadcrumb
        firstText="Trang chủ"
        firstLink={path.homepage}
        secondText="Lịch sử giao dịch"
        secondLink={path.orders}
      ></Breadcrumb>
      <h2 className="mt-5 text-center text-3xl font-bold">Lịch sử giao dịch</h2>
      {/* <table className="mt-4 w-full">
        <thead>
          <tr className="border border-primary bg-primary p-2 text-center font-medium text-white">
            <td className="p-5">Mã giao dịch</td>
            <td className="p-5">Tên người thanh toán</td>
            <td className="p-5">Số lượng vé</td>
            <td className="p-5">Tổng tiền</td>
            <td className="p-5">Thời gian giao dịch</td>
            <td className="p-5">Trạng thái</td>
            <td className="p-5">Chi tiết</td>
          </tr>
        </thead>
        <tbody>
          {orderHistory?.map((orderHistory) => (
            <tr
              className="border border-black bg-white text-center text-black"
              key={orderHistory.orderHeaderId}
            >
              <td className="p-5">{orderHistory.orderHeaderId}</td>
              <td className="p-5">{orderHistory.pickupName}</td>
              <td className="p-5">{orderHistory.orderDetails.length}</td>
              <td className="p-5">{formatCurrency(orderHistory.orderTotal)} VNĐ</td>
              <td className="p-5">{displayEnGBDateAndTime(orderHistory.orderDate)}</td>
              {orderHistory.status === orderStatus.pending && (
                <td className="rounded-full bg-primaryYellow text-white">
                  <span className="h-5 w-max">{orderHistory.status}</span>
                </td>
              )}
              {orderHistory.status === orderStatus.confirmed && (
                <td className="rounded-full bg-green-400 text-white">
                  <span className="h-5 w-max">{orderHistory.status}</span>
                </td>
              )}
              <td className="p-5">
                <Link
                  className="text-primary"
                  to={`${orderHistory.orderHeaderId}`}
                >
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <Table className="mt-10">
        <thead>
          <tr>
            <th>Mã giao dịch</th>
            <th>Tên người thanh toán</th>
            <th>Số lượng vé</th>
            <th>Tổng tiền</th>
            <th>Thời gian giao dịch</th>
            <th>Trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory?.map((orderHistory) => (
            <tr key={orderHistory.orderHeaderId}>
              <td>{orderHistory.orderHeaderId}</td>
              <td>{orderHistory.pickupName}</td>
              <td>{orderHistory.orderDetails.length}</td>
              <td>{formatCurrency(orderHistory.orderTotal)} VNĐ</td>
              <td>{displayEnGBDateAndTime(orderHistory.orderDate)}</td>
              {orderHistory.status === orderStatus.pending && (
                <td>
                  <span className="flex w-[106px] items-center justify-center rounded-full bg-primaryYellow px-3 py-2 text-sm font-medium text-white">
                    Đang chờ
                  </span>
                </td>
              )}
              {orderHistory.status === orderStatus.confirmed && (
                <td>
                  <span className="flex w-[106px] items-center justify-center rounded-full bg-green-400 px-3 py-2 text-sm font-medium text-white">
                    Thành công
                  </span>
                </td>
              )}
              <td>
                <Link
                  className="text-primary"
                  to={`${orderHistory.orderHeaderId}`}
                >
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersPage;
