type Role = "user" | "admin";
export type ApplicationUserType = {
  id?: string;
  fullname?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  avatar?: string;
  createdDate?: string;
  updatedDate?: string;
  role?: Role;
};
