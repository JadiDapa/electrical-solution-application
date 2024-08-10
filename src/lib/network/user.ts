import { axiosInstance } from "../axiosInstance";
import { CreateUserType, UserType } from "../type/user";

export async function getAllUsers() {
  const { data } = await axiosInstance.get<UserType>("/users");
  return data;
}

export async function createUser(values: CreateUserType) {
  const { data } = await axiosInstance.post("/users", values);
  return data;
}
