import { axiosInstance } from "../axiosInstance";
import {
  CreateMaterialCalculationType,
  MaterialCalculationType,
} from "../type/material-calculation";

export async function getAllMaterialCalculations() {
  const { data } = await axiosInstance.get<MaterialCalculationType[]>(
    "/material-calculations",
  );
  return data;
}

export async function getMaterialCalculationsByProjectId(id: string) {
  const { data } = await axiosInstance.get<MaterialCalculationType[]>(
    "/material-calculations/projects/" + id,
  );
  return data;
}

export async function createMaterialCalculation(
  values: CreateMaterialCalculationType,
) {
  const { data } = await axiosInstance.post("/material-calculations", values);
  return data;
}

export async function updateMaterialCalculation(
  id: string,
  values: CreateMaterialCalculationType,
) {
  const { data } = await axiosInstance.put(
    "/material-calculations/" + id,
    values,
  );
  return data.value;
}

export async function deleteMaterialCalculation(id: string) {
  const { data } = await axiosInstance.delete("/material-calculations/" + id);
  return data;
}
