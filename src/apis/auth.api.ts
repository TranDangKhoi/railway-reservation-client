import { AuthResponseType } from "src/types/auth-response.types";
import { SuccessApiResponseType } from "src/types/response.types";
import { ApplicationUserType } from "src/types/user.types";
import http from "src/utils/http";

const authApi = {
  registerAccount: (body: { fullname: string; email: string; password: string }) =>
    http.post<AuthResponseType>("/auth/register", body),
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponseType>("/auth/login", body),
  logoutAccount: () => http.post<AuthResponseType>("/auth/logout"),
  getProfileById: (userId: string) =>
    http.get<SuccessApiResponseType<ApplicationUserType>>("/profile", {
      params: {
        userId,
      },
    }),
  updateProfile: (body: { id: string; fullname: string; phoneNumber: string; address: string }) =>
    http.put("/profile", body),
};

export default authApi;
