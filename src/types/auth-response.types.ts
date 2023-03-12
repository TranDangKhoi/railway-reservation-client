import { SuccessApiResponseType } from "./response.types";
import { ApplicationUserType } from "./user.types";

export type AuthResponseType = SuccessApiResponseType<{
  access_token: string;
  applicationUser: ApplicationUserType;
}>;
