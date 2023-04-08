import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import authApi from "src/apis/auth.api";
import Breadcrumb from "src/components/Breadcrumb";
import Input from "src/components/Input";
import { path } from "src/constants/path.enum";
import { AuthContext } from "src/contexts/auth.context";
import { infoSchema, InfoType } from "src/schemas/schemas";
import { saveProfileToLS } from "src/utils/auth";
import Swal from "sweetalert2";
import Label from "../Homepage/components/Label";

const UpdateProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InfoType>({
    reValidateMode: "onBlur",
    mode: "onSubmit",
    defaultValues: {
      address: userProfile?.address,
      fullname: userProfile?.fullname,
      phoneNumber: userProfile?.phoneNumber,
    },
    resolver: yupResolver(infoSchema),
  });
  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        iconColor: "#3b71fe",
        text: "Cập nhật thành công",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        navigate(path.profile);
      }, 2000);
    },
  });
  const handleUpdateProfile = handleSubmit((data) => {
    Swal.fire({
      title: "Bạn chuẩn bị thực hiện cập nhật thông tin cá nhân?",
      text: "Hãy kiểm tra lại thông tin trước khi thực hiện cập nhật",
      icon: "question",
      showConfirmButton: true,
      confirmButtonText: "Cập nhật",
      showCancelButton: true,
      cancelButtonText: "Quay về",
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateProfileMutation.mutate({
          id: userId as string,
          address: data.address,
          fullname: data.fullname,
          phoneNumber: data.phoneNumber,
        });
        saveProfileToLS({
          ...userProfile,
          address: data.address,
          fullname: data.fullname,
          phoneNumber: data.phoneNumber,
        });
        setUserProfile({
          ...userProfile,
          address: data.address,
          fullname: data.fullname,
          phoneNumber: data.phoneNumber,
        });
      }
    });
  });
  return (
    <div className="container mt-10">
      <Breadcrumb
        firstText="Trang chủ"
        firstLink={path.homepage}
        secondText="Thông tin cá nhân"
        secondLink={path.profile}
        thirdText="Cập nhật thông tin cá nhân"
        thirdLink={window.location.href}
      ></Breadcrumb>
      <h2 className="mt-6 text-3xl font-bold">Cập nhật thông tin cá nhân</h2>
      <form
        onSubmit={handleUpdateProfile}
        className="mt-6 grid grid-cols-2 gap-x-5"
      >
        <div className="col-span-1">
          <Label htmlFor="fullname">Họ và tên</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Nhập họ tên của bạn"
            register={register}
            errorMsg={errors.fullname?.message}
          ></Input>
        </div>
        <div className="col-span-1">
          <Label htmlFor="fullname">Số điện thoại</Label>
          <Input
            type="number"
            name="phoneNumber"
            placeholder="Nhập số điện thoại của bạn"
            register={register}
            errorMsg={errors.phoneNumber?.message}
          ></Input>
        </div>
        <div className="col-span-2">
          <Label htmlFor="fullname">Địa chỉ nhà</Label>
          <Input
            type="text"
            name="address"
            placeholder="Nhập địa chỉ nhà của bạn"
            register={register}
            errorMsg={errors.address?.message}
          ></Input>
        </div>
        <div className="flex items-center gap-x-3">
          <button
            type="submit"
            className="rounded-full border border-transparent bg-primary px-5 py-2 text-sm font-medium text-white"
          >
            Cập nhật
          </button>
          <Link
            to={path.profile}
            className="rounded-full border border-primary bg-white px-5 py-2 text-sm font-medium text-primary"
          >
            Quay về
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
