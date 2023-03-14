import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authApi from "src/apis/auth.api";
import Input from "src/components/Input";
import { path } from "src/constants/path.enum";
import { loginSchema, LoginType } from "src/utils/schemas";
import Button from "src/components/Button";
import { AuthContext } from "src/contexts/auth.context";
import { isAxiosError } from "axios";
import { ErrorApiResponseType } from "src/types/response.types";
import { isAxiosUnprocessableEntity } from "src/utils/isAxiosError";
import InputPassword from "src/components/InputPassword";

type FormDataType = LoginType;
const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserProfile, setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormDataType) => authApi.loginAccount(body),
  });
  const handleLogin = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        navigate(path.homepage);
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
            setError("password", { message: formError });
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
          onSubmit={handleLogin}
          noValidate
        >
          <div className="text-center text-2xl font-medium">Đăng nhập tài khoản</div>
          <Input
            type="text"
            name="email"
            placeholder="Nhập địa chỉ e-mail"
            containerClassName="mt-5"
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
          <Button
            type="submit"
            isLoading={loginAccountMutation.isLoading}
            containerClassName="mt-2"
          >
            Đăng nhập
          </Button>
          <div className="mt-8 flex items-center justify-center">
            <span className="text-gray-400">Bạn chưa có tài khoản?</span>
            <Link
              className="ml-1 font-medium text-primary"
              to={path.register}
            >
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
