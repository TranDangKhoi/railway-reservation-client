import axios, { AxiosError, AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { AuthResponseType } from "src/types/auth-response.types";
import { ApplicationUserType } from "src/types/user.types";
import {
  clearAuthenInfoFromLS,
  getAccessTokenFromLS,
  getProfileFromLS,
  saveAccessTokenToLS,
  saveProfileToLS,
} from "./auth";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private userProfile: ApplicationUserType;
  constructor() {
    this.accessToken = getAccessTokenFromLS() || "";
    this.userProfile = getProfileFromLS() || null;
    this.instance = axios.create({
      baseURL: "https://localhost:7098/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;

          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/auth/login" || url === "/auth/register") {
          this.accessToken = (response.data as AuthResponseType).data.access_token;
          this.userProfile = (response.data as AuthResponseType).data.applicationUser;
          const token = this.accessToken;
          const decoded: ApplicationUserType = jwtDecode(token);
          saveAccessTokenToLS(this.accessToken);
          saveProfileToLS({ ...this.userProfile, role: decoded.role });
        } else if (url === "/auth/logout") {
          this.accessToken = "";
          clearAuthenInfoFromLS();
        } else if (response.status === 200 && url == "/cart/add-to-cart") {
          toast.dismiss();
          toast.success("Thêm vào giỏ vé thành công", {
            autoClose: 1000,
            hideProgressBar: true,
            position: "top-center",
          });
        } else if (response.status === 202 && url === "/cart/add-to-cart") {
          toast.dismiss();
          toast.success("Xóa vé khỏi giỏ thành công", {
            autoClose: 1000,
            hideProgressBar: true,
            position: "top-center",
          });
        }
        return response;
      },
      (error: AxiosError) => {
        if (error?.response?.status === HttpStatusCode.Unauthorized) {
          toast.dismiss();
          toast.error("Vui lòng đăng nhập để sử dụng tính năng này");
          clearAuthenInfoFromLS();
          return Promise.reject(error);
        }
        if (error?.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // const message = error.message;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data.errorMessages || error.message;
          toast.dismiss();
          toast.error(message);
          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
