import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import orderApi from "src/apis/order.api";
import Breadcrumb from "src/components/Breadcrumb";
import { CalendarIcon, ShieldIcon } from "src/components/Icon";
import SkeletonLoading from "src/components/SkeletonLoading";
import { orderStatus } from "src/constants/orderStatus.enum";
import { path } from "src/constants/path.enum";
import { displayEnGBDateAndTime } from "src/utils/formatDate";
import { formatCurrency } from "src/utils/formatNumber";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { data: orderHeaderData, isLoading: orderHeaderIsLoading } = useQuery({
    queryKey: ["orderDetail", { orderId }],
    queryFn: () => orderApi.getOrderDetailByOrderId(Number(orderId)),
  });
  const order = orderHeaderData?.data.data;
  return (
    <div className="container mt-10">
      <Breadcrumb
        firstText="Trang chủ"
        firstLink={path.homepage}
        secondText="Lịch sử giao dịch"
        secondLink={path.orders}
        thirdText={`${order?.orderHeaderId ? `Chi tiết đơn hàng mã số ${order?.orderHeaderId}` : "Đang tải"}`}
        thirdLink={`${order?.orderHeaderId && window.location.href}`}
      ></Breadcrumb>
      <div className="mt-16 flex items-center gap-x-7">
        {!orderHeaderIsLoading && order ? (
          <>
            <h2 className="text-2xl font-bold">Đơn hàng mã số {order?.orderHeaderId}</h2>
            {order?.status === orderStatus.confirmed && (
              <div className="flex items-center gap-x-1 text-base font-medium text-secondaryGray">
                <span>Trạng thái:</span>
                <span className="flex w-max items-center justify-center rounded-full bg-green-400 p-2 text-xs text-white">
                  Thành công
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="mt-2 w-full">
            <SkeletonLoading></SkeletonLoading>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-x-5">
        <div className="flex items-center gap-x-2">
          <span>
            <CalendarIcon
              className="h-4 w-4"
              fill="black"
            ></CalendarIcon>
          </span>
          <span>Thời gian giao dịch:</span>
          <span className="text-sm font-medium">{displayEnGBDateAndTime(order?.orderDate as string)}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <span>
            <ShieldIcon
              className="h-4 w-4"
              fill="#4ADE80"
            ></ShieldIcon>
          </span>
          <span>Mã giao dịch</span>
          <span className="text-sm font-medium">{order?.stripePaymentIntentID}</span>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-primaryGray py-2 px-4">
        <div className="flex justify-between gap-x-5">
          <div className="left flex-shrink-0">
            <h3 className="text-xl font-bold">Thông tin thanh toán</h3>
            <div className="mt-2 flex flex-col gap-y-1">
              <div className="text-base font-medium">Số lượng vé: {order?.totalItems}</div>
              <div className="text-base font-medium">
                Tổng giá trị đơn hàng: {formatCurrency(order?.orderTotal)} VNĐ
              </div>
              <div className="text-base font-medium">Tên người thanh toán: {order?.pickupName}</div>
              <div className="text-base font-medium">E-mail: {order?.pickupEmail}</div>
              <div className="text-base font-medium">Số điện thoại: {order?.pickupPhoneNumber}</div>
              <div className="text-base font-medium">Hình thức thanh toán: Thẻ tín dụng</div>
            </div>
            <h3 className="mt-5 text-xl font-bold">Chi tiết đơn hàng</h3>
            {order?.orderDetails.map((orderDetail, index) => (
              <div
                className="mt-4 text-base"
                key={orderDetail.orderDetailId}
              >
                <div>
                  <div className="text-sm font-bold">Vé {index + 1}:</div>
                  <div className="flex items-center gap-x-1">
                    <span>Tàu {orderDetail.seat.carriage.train.name},</span>
                    <span>{orderDetail.seat.carriage.train.track.departureStation}</span>
                    <span>-</span>
                    <span>{orderDetail.seat.carriage.train.track.arrivalStation}</span>
                    <span>
                      , toa số {orderDetail.seat.carriage.carriageNo}, chỗ ngồi số {orderDetail.seat.seatNo}
                    </span>
                  </div>
                  <div></div>
                  <div>Thời gian đi: {displayEnGBDateAndTime(orderDetail.seat.carriage.train.track.departureTime)}</div>
                  <div>Thời gian đến: {displayEnGBDateAndTime(orderDetail.seat.carriage.train.track.arrivalTime)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="right p-5">
            <img
              src="https://plus.unsplash.com/premium_photo-1676122795719-6fa9374a46c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="h-full w-[600px] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
      {/* <div className="mt-10 grid grid-cols-5 gap-x-5">
        <div className="col-span-2">
          {order &&
            order.orderDetails.length > 0 &&
            order.orderDetails.map((orderDetail) => (
              <>
                <div className="flex items-center gap-x-7">
                  <div className="text-[24px] font-bold">
                    {getFirstLetters(orderDetail.seat.carriage.train.track.departureStation as string)}
                  </div>
                  <div className="flex items-center gap-x-2">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="h-2 w-2 rounded-full bg-secondaryGray"
                        ></div>
                      ))}
                    <TrainIcon
                      className="h-10 w-10"
                      fill="#3B71FE"
                    ></TrainIcon>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="h-2 w-2 rounded-full bg-secondaryGray"
                        ></div>
                      ))}
                  </div>
                  <div className="text-[24px] font-bold">
                    {getFirstLetters(orderDetail.seat.carriage.train.track.arrivalStation as string)}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-x-3">
                  <div className="flex items-center gap-x-2">
                    <span>
                      <CalendarIcon
                        className="h-5 w-5"
                        fill="#FFAF4E"
                      ></CalendarIcon>
                    </span>
                    <span className="text-sm font-medium">{displayEnGBDateAndTime(order?.orderDate as string)}</span>
                  </div>
                </div>
              </>
            ))}
        </div>
        <div className="col-span-3"></div>
      </div> */}
    </div>
  );
};

export default OrderDetailsPage;
