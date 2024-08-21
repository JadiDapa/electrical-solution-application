import { axiosInstance } from "../axiosInstance";
import { CreateOfferType, OfferType } from "../type/offer";

export async function getAllOffers() {
  const { data } = await axiosInstance.get<OfferType[]>("/offers");
  return data;
}
export async function getOfferByProjectId(projectId: string) {
  const { data } = await axiosInstance.get<OfferType>(
    "/offers/projects/" + projectId,
  );
  return data;
}
export async function getOfferById(id: string) {
  const { data } = await axiosInstance.get<OfferType[]>("/offers");
  return data;
}

export async function createOffer(values: CreateOfferType) {
  const { data } = await axiosInstance.post("/offers", values);
  return data;
}

export async function updateOffer(id: string, values: CreateOfferType) {
  const { data } = await axiosInstance.put("/offers/" + id, values);
  return data.value;
}

export async function deleteOffer(id: string) {
  const { data } = await axiosInstance.delete("/offers/" + id);
  return data;
}
