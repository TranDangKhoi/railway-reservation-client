import http from "src/utils/http";

const authApi = {
  loginAccount: (body: { email: string; password: string }) => http.post("/auth/login", body),
};
