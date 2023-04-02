import { PaymentElement } from "@stripe/react-stripe-js";
import Button from "src/components/Button";

const PaymentForm = () => {
  return (
    <form className="mt-5">
      <PaymentElement />
      <Button className="mt-5">Chấp nhận thanh toán</Button>
    </form>
  );
};

export default PaymentForm;
