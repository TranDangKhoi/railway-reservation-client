import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import cartApi from "src/apis/cart.api";
import orderApi from "src/apis/order.api";
import seatApi from "src/apis/seat.api";
import Button from "src/components/Button";
import { orderStatus } from "src/constants/orderStatus.enum";
import { seatStatus } from "src/constants/seatStatus.enum";
import { AuthContext } from "src/contexts/auth.context";
import { CartType } from "src/types/cart.types";
import { OrderDetailType } from "src/types/order.types";
import Swal from "sweetalert2";
type PaymentPropsType = {
  paymentFormData: {
    fullname: string;
    address: string;
    phoneNumber: string;
  };
  cart?: CartType;
  paymentIntentId: string;
};
const PaymentForm = ({ paymentFormData, cart, paymentIntentId }: PaymentPropsType) => {
  const { userProfile } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const seatStatusMutation = useMutation({
    mutationFn: seatApi.updateSeatStatusById,
  });
  const orderMutation = useMutation({
    mutationFn: orderApi.placeOrder,
  });
  const removeCartMutation = useMutation({
    mutationFn: cartApi.removeFromCart,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Swal.fire({
      title: "Chấp nhận thanh toán?",
      text: "Sau khi thanh toán, đơn hàng sẽ được kiểm duyệt trong vòng 5 phút",
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: "Chấp nhận",
      showCancelButton: true,
      cancelButtonText: "Từ chối",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!stripe || !elements) {
          return;
        }
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "https://example.com/order/123/complete",
          },
          redirect: "if_required",
        });
        if (result.error) {
          console.log(result.error.message);
        } else {
          const orderDetails: OrderDetailType[] = [];
          cart?.cartItems.forEach((cartItem) => {
            const tempOrderDetails: OrderDetailType = {
              seatId: cartItem.seat.id,
              price: cartItem.seat.seatPrice,
            };
            orderDetails.push(tempOrderDetails);
            removeCartMutation.mutate({ cartItemId: cartItem.id, userId: userProfile?.id as string });
            seatStatusMutation.mutate({ id: cartItem.seat.id, seatStatus: seatStatus.reserved });
          });
          orderMutation.mutate({
            pickupName: paymentFormData.fullname,
            pickupPhoneNumber: paymentFormData.phoneNumber,
            applicationUserId: userProfile?.id as string,
            orderTotal: cart?.cartTotal as number,
            pickupEmail: userProfile?.email as string,
            totalItems: cart?.cartItems.length as number,
            status: orderStatus.confirmed,
            stripePaymentIntentID: paymentIntentId,
            orderDetailsDTO: orderDetails,
          });
          window.location.reload();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "success",
          iconColor: "#3b71fe",
          text: "Đã từ chối thanh toán",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };
  return (
    <form
      className="mt-5"
      onSubmit={handleSubmit}
    >
      <PaymentElement />
      <Button
        className="mt-5"
        isLoading={!stripe}
      >
        Chấp nhận thanh toán
      </Button>
    </form>
  );
};

export default PaymentForm;
