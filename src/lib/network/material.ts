import { axiosInstance } from "../axiosInstance";
import { CreateMaterialType, MaterialType } from "../type/material";

export async function getAllMaterials() {
  const { data } = await axiosInstance.get<MaterialType[]>("/materials");
  return data;
}

export async function createMaterial(values: CreateMaterialType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("description", values.description as string);
  formData.append("image", values.image as File);

  const { data } = await axiosInstance.post("/materials", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function updateMaterial(id: string, values: CreateMaterialType) {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("slug", values.slug);
  formData.append("description", values.description as string);
  formData.append("image", values.image as File);

  const { data } = await axiosInstance.put(`/materials/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.value;
}

export async function deleteMaterial(id: string) {
  const { data } = await axiosInstance.delete("/materials/" + id);
  return data;
}
