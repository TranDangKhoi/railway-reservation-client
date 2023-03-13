import { AuthResponseType } from "src/types/auth-response.types";
import http from "src/utils/http";

const authApi = {
  registerAccount: (body: { fullname: string; email: string; password: string }) =>
    http.post<AuthResponseType>("/auth/register", body),
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponseType>("/auth/login", body),
  logoutAccount: () => http.post<AuthResponseType>("/auth/logout"),
};

export default authApi;
