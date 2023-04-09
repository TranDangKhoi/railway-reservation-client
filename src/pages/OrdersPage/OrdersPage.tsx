import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
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
      <Table className="mt-10">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
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
              {orderHistory.status === orderStatus.cancelled && (
                <td>
                  <span className="flex w-[106px] items-center justify-center rounded-full bg-green-400 px-3 py-2 text-sm font-medium text-white">
                    Đã hủy
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
