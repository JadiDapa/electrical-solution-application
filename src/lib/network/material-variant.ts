import { axiosInstance } from "../axiosInstance";
import {
  CreateMaterialVariantType,
  MaterialVariantType,
} from "../type/material-variant";

export async function getAllMaterialVariants() {
  const { data } =
    await axiosInstance.get<MaterialVariantType[]>("/material-variants");
  return data;
}

export async function createMaterialVariant(values: CreateMaterialVariantType) {
  const { data } = await axiosInstance.post("/material-variants", values);
  return data;
}

export async function updateMaterialVariant(
  id: string,
  values: CreateMaterialVariantType,
) {
  const { data } = await axiosInstance.put("/material-variants/" + id, values);
  return data.value;
}

export async function deleteMaterialVariant(id: string) {
  const { data } = await axiosInstance.delete("/material-variants/" + id);
  return data;
}
