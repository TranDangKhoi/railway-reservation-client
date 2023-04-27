import { yupResolver } from "@hookform/resolvers/yup";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import cartApi from "src/apis/cart.api";
import paymentApi from "src/apis/payment.api";
import PointUp from "src/assets/images/PointUp.png";
import Breadcrumb from "src/components/Breadcrumb";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import { infoSchema, InfoType } from "src/schemas/schemas";
import { displayEnGBDateAndTime } from "src/utils/formatDate";
import { formatCurrency } from "src/utils/formatNumber";
import Label from "../Homepage/components/Label";
import PaymentForm from "./components/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51Mqv9vD9Ce6Kh26GBgqvgFd6rYmEwNm5TXMzC75MDZikqEsNW3IksOfvWs1zKW3OOyB67GyZaO1ZbsMni9iJjfcd00kIhs7vWX",
);
const PaymentPage = () => {
  const { userProfile, isAuthenticated } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [clientSecretKey, setClientSecretKey] = useState<string>("");
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const [paymentFormData, setPaymentFormData] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
  });
  const paymentMutation = useMutation({
    mutationFn: () => paymentApi.makePayment(userProfile?.id as string),
    onSuccess: (data) => {
      setClientSecretKey(data.data.data.clientSecret);
      setFormSubmitted(true);
      setPaymentIntentId(data.data.data.stripePaymentIntentId);
    },
  });
  const options = {
    clientSecret: clientSecretKey,
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InfoType>({
    reValidateMode: "onChange",
    mode: "onSubmit",
    defaultValues: {
      address: userProfile?.address,
      fullname: userProfile?.fullname,
      phoneNumber: userProfile?.phoneNumber,
    },
    resolver: yupResolver(infoSchema),
  });
  const { data: cartQueryData } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartApi.getCart({ userId: userProfile?.id as string }),
    enabled: isAuthenticated,
  });
  const cart = cartQueryData?.data.data;
  const removeFromCartMutation = useMutation({
    mutationFn: cartApi.removeFromCart,
  });
  const handleCreatePayment = handleSubmit((data) => {
    paymentMutation.mutate();
    setPaymentFormData(data);
  });
  const handleSetFormSubmitted = () => {
    if (errors) {
      setFormSubmitted(false);
    }
  };
  const handleRemoveFromCart = (body: { cartItemId: number; userId: string }) => {
    removeFromCartMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.dismiss();
        toast.success("Xóa vé khỏi giỏ thành công", {
          autoClose: 1000,
          hideProgressBar: true,
          position: "top-center",
        });
      },
    });
  };
  return (
    <div className="container mt-10">
      <Breadcrumb
        firstText="Trang chủ"
        firstLink={path.homepage}
        secondText="Thanh toán giỏ vé"
        secondLink={path.payment}
      ></Breadcrumb>
      <div className="mt-14 grid grid-cols-3 gap-x-20">
        <div className="col-span-2">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
            <p className="mt-2 text-secondaryGray">Hãy điền đầy đủ thông tin của bạn</p>
          </div>
          <form
            className="mt-8 grid grid-cols-2 items-center gap-x-4"
            onSubmit={handleCreatePayment}
          >
            <div className="col-span-1">
              <Label htmlFor="fullname">Họ và tên</Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Nhập vào họ tên của bạn"
                errorMsg={errors.fullname?.message}
                register={register}
              ></Input>
            </div>
            <div className="col-span-1">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                type="number"
                name="phoneNumber"
                placeholder="Nhập vào số điện thoại của bạn"
                errorMsg={errors.phoneNumber?.message}
                register={register}
              ></Input>
            </div>
            <div className="col-span-1">
              <Label htmlFor="address">Địa chỉ nhà</Label>
              <Input
                type="text"
                name="address"
                placeholder="Nhập vào địa chỉ của bạn"
                errorMsg={errors.address?.message}
                register={register}
              ></Input>
            </div>
            <Button
              type="submit"
              onClick={handleSetFormSubmitted}
              containerClassName="col-span-1 mb-1"
            >
              Xác nhận
            </Button>
          </form>
          <div className="mt-14 flex flex-col">
            <h2 className="text-2xl font-bold">Phương thức thanh toán</h2>
            <p className="mt-2 text-secondaryGray">
              Hãy lựa chọn phương thức thanh toán của bạn (Phải hoàn thành toàn bộ các bước trên)
            </p>
            {formSubmitted ? (
              <Elements
                stripe={stripePromise}
                options={options}
              >
                <PaymentForm
                  paymentFormData={paymentFormData}
                  cart={cart}
                  paymentIntentId={paymentIntentId}
                ></PaymentForm>
              </Elements>
            ) : (
              <div className="mt-5 flex flex-col items-center justify-center">
                <img
                  src={PointUp}
                  alt=""
                  className="h-32 w-32"
                />
                <h3 className="w-[500px] text-center text-xl font-medium">
                  Hãy hoàn thiện các bước bên trên trước khi thực hiện chọn phương thức thanh toán
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 self-baseline rounded-xl bg-white p-4 shadow-shadow3">
          <h2 className="px-2 text-xl font-bold">Đơn hàng của bạn</h2>
          {cart ? (
            <>
              {cart.cartItems.map((cartItem) => (
                <div
                  className="flex items-center justify-between"
                  key={cartItem.id}
                >
                  <div className="mt-4 px-2 text-base">
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
                  <button
                    className="flex-shrink-0 text-4xl text-red-500"
                    onClick={() => handleRemoveFromCart({ userId: userProfile?.id as string, cartItemId: cartItem.id })}
                  >
                    🗑
                  </button>
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
