import { AuthResponseType } from "src/types/auth-response.types";
import { ErrorApiResponseType, SuccessApiResponseType } from "src/types/response.types";
import http from "src/utils/http";

const authApi = {
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponseType>("/auth/login", body),
  logoutAccount: () => http.post<AuthResponseType>("/auth/logout"),
};

export default authApi;
