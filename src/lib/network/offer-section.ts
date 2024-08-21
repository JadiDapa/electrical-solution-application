import { axiosInstance } from "../axiosInstance";
import {
  CreateOfferSectionType,
  OfferSectionType,
} from "../type/offer-section";

export async function getAllOfferSections() {
  const { data } =
    await axiosInstance.get<OfferSectionType[]>("/offer-sections");
  return data;
}
export async function getOfferSectionByProjectId(projectId: string) {
  const { data } = await axiosInstance.get<OfferSectionType[]>(
    "/offer-sections/projects/" + projectId,
  );
  return data;
}
export async function getOfferSectionById(id: string) {
  const { data } =
    await axiosInstance.get<OfferSectionType[]>("/offer-sections");
  return data;
}

export async function createOfferSection(values: CreateOfferSectionType) {
  const { data } = await axiosInstance.post("/offer-sections", values);
  return data;
}

export async function updateOfferSection(
  id: string,
  values: CreateOfferSectionType,
) {
  const { data } = await axiosInstance.put("/offer-sections/" + id, values);
  return data.value;
}

export async function deleteOfferSection(id: string) {
  const { data } = await axiosInstance.delete("/offer-sections/" + id);
  return data;
}
