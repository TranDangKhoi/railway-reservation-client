import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import orderApi from "src/apis/order.api";
import Breadcrumb from "src/components/Breadcrumb";
import { CalendarIcon, ShieldIcon, TrainIcon } from "src/components/Icon";
import SkeletonLoading from "src/components/SkeletonLoading";
import { orderStatus } from "src/constants/orderStatus.enum";
import { path } from "src/constants/path.enum";
import { displayEnGBDateAndTime } from "src/utils/formatDate";
import { getFirstLetters } from "src/utils/formatStation";

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
              fill="black"
            ></ShieldIcon>
          </span>
          <span>Mã giao dịch</span>
          <span className="text-sm font-medium">{order?.stripePaymentIntentID}</span>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-primaryGray py-2 px-4"></div>
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
