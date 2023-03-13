import * as yup from "yup";
const schema = yup.object({
  fullname: yup.string().required("Vui lòng nhập vào họ tên đầy đủ của bạn"),
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
});

export const loginSchema = schema.pick(["email", "password"]);
export const registerSchema = schema.pick(["fullname", "email", "password", "confirm_password"]);

export type LoginType = yup.InferType<typeof loginSchema>;
export type RegisterType = yup.InferType<typeof registerSchema>;