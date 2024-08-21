import { axiosInstance } from "../axiosInstance";
import { CreateUserType, UserType } from "../type/user";

export async function getAllUsers() {
  const { data } = await axiosInstance.get<UserType[]>("/users");
  return data;
}

export async function getUserById(id: string) {
  const { data } = await axiosInstance.get<UserType>("/users/" + id);
  return data;
}

export async function getUserByEmail(email: string) {
  const { data } = await axiosInstance.get<UserType[]>("/users/email/" + email);
  return data;
}

export async function createUser(values: CreateUserType) {
  const { data } = await axiosInstance.post("/users", values);
  return data;
}

export async function updateUser(id: string, values: CreateUserType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("email", values.email);
  formData.append("password", values.password as string);
  formData.append("role", values.role as string);
  if (values.image instanceof File) {
    formData.append("image", values.image);
  }

  const { data } = await axiosInstance.put("/users/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function deleteUser(id: string) {
  const { data } = await axiosInstance.delete("/users/" + id);
  return data;
}
