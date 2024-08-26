import { axiosInstance } from "../axiosInstance";
import { AssementType, CreateAssementType } from "../type/assement";

export async function getAllAssements() {
  const { data } = await axiosInstance.get<AssementType[]>("/assements");
  return data;
}

export async function getAssementById() {
  const { data } = await axiosInstance.get<AssementType>("/assements");
  return data;
}

export async function createAssement(values: CreateAssementType) {
  const { data } = await axiosInstance.post("/assements", values);
  return data;
}

export async function updateAssement(id: string, values: CreateAssementType) {
  const { data } = await axiosInstance.put("/assements/" + id, values);
  return data;
}

export async function deleteAssement(id: string) {
  const { data } = await axiosInstance.delete("/assements/" + id);
  return data;
}
