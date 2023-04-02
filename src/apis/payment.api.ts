import { PaymentType } from "src/types/payment.type";
import { SuccessApiResponseType } from "src/types/response.types";
import http from "src/utils/http";

const paymentApi = {
  makePayment: (userId: string) =>
    http.post<SuccessApiResponseType<PaymentType>>(
      "/payment",
      {},
      {
        params: {
          userId,
        },
      },
    ),
};
export default paymentApi;
