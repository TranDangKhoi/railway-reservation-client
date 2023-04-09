import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import orderApi from "src/apis/order.api";
import Table from "src/components/Table";
import { orderStatus } from "src/constants/orderStatus.enum";
import { displayEnGBDateAndTime } from "src/utils/formatDate";
import Swal from "sweetalert2";

const AdminOrdersPage = () => {
  const queryClient = useQueryClient();
  const { data: allOrdersQuery, isLoading: allOrdersIsLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: () => orderApi.getAllOrders(),
  });
  const orders = allOrdersQuery?.data.data;
  const updateOrderMutation = useMutation({
    mutationFn: orderApi.updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    },
  });
  const handleUpdateStatus = (orderHeaderId: number) => {
    Swal.fire({
      icon: "question",
      title: "Bạn có chấp nhận đơn hàng này?",
      titleText: "Hãy lựa chọn trạng thái cho đơn hàng",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Chấp nhận",
      confirmButtonColor: "#3B71FE",
      cancelButtonText: "Đang chờ",
      cancelButtonColor: "#FFAF4E",
      denyButtonText: `Hủy đơn`,
      denyButtonColor: "#EF4444",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        updateOrderMutation.mutate({ status: orderStatus.confirmed, orderHeaderId });
      } else if (result.isDenied) {
        updateOrderMutation.mutate({ status: orderStatus.cancelled, orderHeaderId });
      } else if (result.dismiss) {
        updateOrderMutation.mutate({ status: orderStatus.pending, orderHeaderId });
      }
    });
  };

  return (
    <div className="mx-auto">
      <Table>
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên người thanh toán</th>
            <th>Thời gian giao dịch</th>
            <th>Trạng thái</th>
            <th>Cập nhật trạng thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order.orderHeaderId}>
              <td>{order.orderHeaderId}</td>
              <td>{order.pickupName}</td>
              <td>{displayEnGBDateAndTime(order.orderDate)}</td>

              {order.status === orderStatus.pending && (
                <td>
                  <span className="flex w-[106px] items-center justify-center rounded-full bg-primaryYellow px-3 py-2 text-sm font-medium text-white">
                    Đang chờ
                  </span>
                </td>
              )}
              {order.status === orderStatus.confirmed && (
                <td>
                  <span className="flex w-[106px] items-center justify-center rounded-full bg-green-400 px-3 py-2 text-sm font-medium text-white">
                    Thành công
                  </span>
                </td>
              )}
              {order.status === orderStatus.cancelled && (
                <td>
                  <span className="flex w-[106px] items-center justify-center rounded-full bg-red-500 px-3 py-2 text-sm font-medium text-white">
                    Đã hủy
                  </span>
                </td>
              )}
              <td>
                <button
                  className="text-primary"
                  onClick={() => handleUpdateStatus(order.orderHeaderId)}
                >
                  Cập nhật
                </button>
              </td>
              <td>
                <Link
                  className="text-primary"
                  to={`/orders/${order.orderHeaderId}`}
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

export default AdminOrdersPage;
