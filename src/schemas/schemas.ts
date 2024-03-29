import * as yup from "yup";
const schema = yup.object({
  fullname: yup.string().required("Vui lòng nhập vào họ tên đầy đủ của bạn"),
  phoneNumber: yup
    .string()
    .required("Vui lòng nhập vào số điện thoại của bạn")
    .min(4, "Số điện thoại không hợp lệ")
    .max(30, "Số điện thoại không hợp lệ"),
  address: yup.string().required("Vui lòng nhập vào địa chỉ của bạn"),
  email: yup.string().required("Vui lòng nhập địa chỉ e-mail").email("Địa chỉ e-mail không đúng định dạng"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu của bạn")
    .min(6, "Độ dài mật khẩu phải từ 6 kí tự trở lên")
    .max(160, "Dộ dài mật khẩu phải từ 160 kí tự trở xuống"),
  confirm_password: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu của bạn")
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không trùng khớp"),
  departureStation: yup.string().required("Vui lòng chọn ga khởi hành"),
  arrivalStation: yup.string().required("Vui lòng chọn ga bạn muốn đến"),
  departureTime: yup.string().required("Vui lòng chọn ngày khởi hành"),
});

export const loginSchema = schema.pick(["email", "password"]);
export const registerSchema = schema.pick(["fullname", "email", "password", "confirm_password"]);
export const trackSearchSchema = schema.pick(["departureStation", "arrivalStation", "departureTime"]);
export const authenticationSchema = schema.pick(["email", "fullname", "confirm_password", "password"]);
export const infoSchema = schema.pick(["address", "fullname", "phoneNumber"]);

export type LoginType = yup.InferType<typeof loginSchema>;
export type RegisterType = yup.InferType<typeof registerSchema>;
export type TrackSearchType = yup.InferType<typeof trackSearchSchema>;
export type AuthenticationType = yup.InferType<typeof authenticationSchema>;
export type InfoType = yup.InferType<typeof infoSchema>;
