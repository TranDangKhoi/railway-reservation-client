import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { omit } from "lodash";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authApi from "src/apis/auth.api";
import Button from "src/components/Button";
import Input from "src/components/Input";
import InputPassword from "src/components/InputPassword";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import { ErrorApiResponseType } from "src/types/response.types";
import { isAxiosUnprocessableEntity } from "src/utils/isAxiosError";
import { registerSchema, RegisterType } from "src/utils/schemas";

type FormDataType = RegisterType;
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUserProfile, setIsAuthenticated } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(registerSchema),
  });
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormDataType, "confirm_password">) => authApi.registerAccount(body),
  });
  const handleRegister = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        navigate(-1);
        setUserProfile(data.data.data.applicationUser);
        setIsAuthenticated(Boolean(data.data.data.applicationUser));
      },
      onError: (error) => {
        if (
          isAxiosError<ErrorApiResponseType<FormDataType>>(error) &&
          isAxiosUnprocessableEntity<ErrorApiResponseType<FormDataType>>(error)
        ) {
          const formError = error.response?.data.errorMessages;
          if (formError) {
            setError("email", { message: formError });
          }
        }
      },
    });
  });
  return (
    <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
      <div className="lg:col-span-2 lg:col-start-4">
        <form
          className="rounded-lg bg-white px-3 py-4 shadow-2xl"
          onSubmit={handleRegister}
          noValidate
        >
          <div className="text-center text-2xl font-medium">Đăng ký tài khoản</div>
          <Input
            type="text"
            name="fullname"
            placeholder="Nhập họ tên của bạn"
            containerClassName="mt-5"
            errorMsg={errors.fullname?.message}
            register={register}
          ></Input>
          <Input
            type="text"
            name="email"
            placeholder="Nhập địa chỉ e-mail"
            containerClassName="mt-1"
            errorMsg={errors.email?.message}
            register={register}
          />
          <InputPassword
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            containerClassName="mt-1"
            errorMsg={errors.password?.message}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            register={register}
          />
          <InputPassword
            type="password"
            name="confirm_password"
            placeholder="Xác nhận mật khẩu"
            containerClassName="mt-1"
            errorMsg={errors.confirm_password?.message}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            register={register}
          />
          <Button
            type="submit"
            isLoading={registerAccountMutation.isLoading}
            containerClassName="mt-3"
          >
            Đăng ký
          </Button>
          <div className="mt-8 flex items-center justify-center">
            <span className="text-gray-400">Bạn đã có tài khoản?</span>
            <Link
              className="ml-1 font-medium text-primary"
              to={path.login}
            >
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
