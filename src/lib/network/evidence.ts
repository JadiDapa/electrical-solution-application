import { axiosInstance } from "../axiosInstance";
import { CreateEvidenceType, EvidenceType } from "../type/evidence";

export async function getAllEvidences() {
  const { data } = await axiosInstance.get<EvidenceType[]>("/evidences");
  return data;
}

export async function getEvidencesByProjectId(projectId: string) {
  const { data } = await axiosInstance.get<EvidenceType[]>(
    "/evidences/projects/" + projectId,
  );
  return data;
}

export async function getEvidenceById(id: string) {
  const { data } = await axiosInstance.get<EvidenceType[]>("/evidences/" + id);
  return data;
}

export async function createEvidence(values: CreateEvidenceType) {
  const formData = new FormData();

  formData.append("projectId", values.projectId);
  formData.append("type", values.type);
  formData.append("evidence", values.evidence as File);

  const { data } = await axiosInstance.post("/evidences", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export async function updateEvidence(id: string, values: CreateEvidenceType) {
  const formData = new FormData();

  formData.append("projectId", values.projectId);
  formData.append("type", values.type);
  formData.append("evidence", values.evidence as File);

  const { data } = await axiosInstance.put(`/evidences/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.value;
}

export async function deleteEvidence(id: string) {
  const { data } = await axiosInstance.delete("/evidences/" + id);
  return data;
}
