import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import cartApi from "src/apis/cart.api";
import Input from "src/components/Input";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import { displayEnGBDateAndTime } from "src/utils/formatDate";
import { formatCurrency } from "src/utils/formatNumber";

type PaymentPagePropsType = {
  something: string;
};

const PaymentPage = () => {
  const { userProfile, isAuthenticated } = useContext(AuthContext);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { data: cartQueryData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.getCart({ userId: userProfile?.id as string }),
  });
  const cart = cartQueryData?.data.data;
  return (
    <div className="container mt-10">
      <div className="flex items-center gap-x-3">
        <Link to={path.homepage}>Trang chủ</Link>
        <span>{">"}</span>
        <Link
          to={path.payment}
          className="cursor-pointer text-secondaryGray"
        >
          Thanh toán giỏ vé
        </Link>
      </div>
      <div className="mt-14 grid grid-cols-3 gap-x-20">
        <div className="col-span-2">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
            <p className="mt-2 text-secondaryGray">Hãy điền đầy đủ thông tin của bạn</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4">
            <div className="col-span-1">
              <Input
                type="email"
                name="email"
                placeholder="Nhập vào địa chỉ e-mail của bạn"
              ></Input>
            </div>
            <div className="col-span-1">
              <Input
                type="email"
                name="email"
                placeholder="Nhập vào địa chỉ e-mail của bạn"
              ></Input>
            </div>
            <div className="col-span-1">
              <Input
                type="email"
                name="email"
                placeholder="Nhập vào địa chỉ e-mail của bạn"
              ></Input>
            </div>
            <div className="col-span-1">
              <Input
                type="email"
                name="email"
                placeholder="Nhập vào địa chỉ e-mail của bạn"
              ></Input>
            </div>
            <div className="col-span-1">
              <Input
                type="email"
                name="email"
                placeholder="Nhập vào địa chỉ e-mail của bạn"
              ></Input>
            </div>
          </div>
          <div className="mt-14 flex flex-col">
            <h2 className="text-2xl font-bold">Phương thức thanh toán</h2>
            <p className="mt-2 text-secondaryGray">Hãy lựa chọn phương thức thanh toán của bạn</p>
          </div>
        </div>
        <div className="col-span-1 rounded-xl bg-white p-4 shadow-shadow3">
          <h2 className="px-2 text-xl font-bold">Đơn hàng của bạn</h2>
          {cart ? (
            <>
              {cart.cartItems.map((cartItem) => (
                <div
                  className="mt-4 px-2 text-base"
                  key={cartItem.id}
                >
                  <div>
                    <div className="flex items-center gap-x-1">
                      <span>Tàu {cartItem.seat.carriage.train.name},</span>
                      <span>{cartItem.seat.carriage.train.track.departureStation}</span>
                      <span>-</span>
                      <span>{cartItem.seat.carriage.train.track.arrivalStation}</span>
                    </div>
                    <div>{displayEnGBDateAndTime(cartItem.seat.carriage.train.track.departureTime)}</div>
                    <div>
                      Toa số {cartItem.seat.carriage.carriageNo}, chỗ ngồi số {cartItem.seat.seatNo}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
          <h2 className="mt-4 px-2 text-xl font-bold">Chi tiết</h2>
          <div className="mt-4 flex items-center justify-between px-2">
            <span className="text-base text-secondaryGray">Số lượng vé</span>
            <span className="text-base text-black">{cart?.cartItems.length}</span>
          </div>
          <div className="mt-4 flex items-center justify-between px-2">
            <span className="text-base text-secondaryGray">Phí VAT</span>
            <span className="text-base text-black">0 VNĐ</span>
          </div>
          <div className="mt-4 flex items-center justify-between bg-primaryGray px-2 py-1">
            <span className="text-base text-secondaryGray">Tổng tiền</span>
            <span className="text-base text-black">{formatCurrency(cart?.cartTotal)} VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
