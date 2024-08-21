import { axiosInstance } from "../axiosInstance";
import { CreateProjectType, ProjectType } from "../type/project";

export async function getAllProjects() {
  const { data } = await axiosInstance.get<ProjectType[]>("/projects");
  return data;
}

export async function getProjectsByUserId(userId: string) {
  const { data } = await axiosInstance.get<ProjectType[]>(
    "/projects/user/" + userId,
  );
  return data;
}

export async function getProjectById(id: string) {
  const { data } = await axiosInstance.get<ProjectType>("/projects/" + id);
  return data;
}

export async function createProject(values: CreateProjectType) {
  const { data } = await axiosInstance.post("/projects", values);
  return data;
}

export async function updateProject(id: string, values: CreateProjectType) {
  const { data } = await axiosInstance.put("/projects/" + id, values);
  return data.value;
}

export async function deleteProject(id: string) {
  const { data } = await axiosInstance.delete("/projects/" + id);
  return data;
}
