import { axiosInstance } from "../axiosInstance";
import {
  CreateMaterialSectionType,
  MaterialSectionType,
} from "../type/material-section";

export async function getAllMaterialSections() {
  const { data } =
    await axiosInstance.get<MaterialSectionType[]>("/material-sections");
  return data;
}
export async function getMaterialSectionByProjectId(projectId: string) {
  const { data } = await axiosInstance.get<MaterialSectionType[]>(
    "/material-sections/projects/" + projectId,
  );
  return data;
}

export async function getMaterialSectionBySectionId(sectionId: string) {
  const { data } = await axiosInstance.get<MaterialSectionType[]>(
    "/material-sections/sections/" + sectionId,
  );
  return data;
}

export async function getMaterialSectionById(id: string) {
  const { data } =
    await axiosInstance.get<MaterialSectionType[]>("/material-sections");
  return data;
}

export async function createMaterialSection(values: CreateMaterialSectionType) {
  const { data } = await axiosInstance.post("/material-sections", values);
  return data;
}

export async function updateMaterialSection(
  id: string,
  values: CreateMaterialSectionType,
) {
  const { data } = await axiosInstance.put("/material-sections/" + id, values);
  return data.value;
}

export async function deleteMaterialSection(id: string) {
  const { data } = await axiosInstance.delete("/material-sections/" + id);
  return data;
}
