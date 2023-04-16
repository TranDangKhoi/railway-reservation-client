import { ApplicationUserType } from "src/types/user.types";

export const LocalStorageEventTarget = new EventTarget();

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const clearAuthenInfoFromLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
  const clearAuthenFromLSEvent = new Event("clearAuthen");
  LocalStorageEventTarget.dispatchEvent(clearAuthenFromLSEvent);
};

export const getAccessTokenFromLS = () => localStorage.getItem("access_token") || "";

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const saveProfileToLS = (profile: ApplicationUserType) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
