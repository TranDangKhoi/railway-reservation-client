import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import orderApi from "src/apis/order.api";
import Button from "src/components/Button";
import { orderStatus } from "src/constants/orderStatus.enum";
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
};
const PaymentForm = ({ paymentFormData, cart }: PaymentPropsType) => {
  const { userProfile } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const orderMutation = useMutation({
    mutationFn: orderApi.placeOrder,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Swal.fire({
      title: "Chấp nhận thanh toán?",
      text: "Sau khi thanh toán, đơn hàng sẽ được kiểm duyệt trong vòng 5 phút",
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: "Chấp nhận",
      confirmButtonColor: "#1DC071",
      showCancelButton: true,
      cancelButtonColor: "#d33",
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
          });
          orderMutation.mutate({
            pickupName: paymentFormData.fullname,
            pickupPhoneNumber: paymentFormData.phoneNumber,
            applicationUserId: userProfile?.id as string,
            orderTotal: cart?.cartTotal as number,
            pickupEmail: userProfile?.email as string,
            totalItems: cart?.cartItems.length as number,
            status: orderStatus.confirmed,
            stripePaymentIntentID: "",
            orderDetailsDTO: orderDetails,
          });
          window.location.reload();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "success",
          iconColor: "#1DC071",
          text: "Đã từ chối thanh toán",
          timer: 1500,
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
