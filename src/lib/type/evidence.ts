import { Project } from "@prisma/client";

export interface EvidenceType {
  id: string;
  projectId: string;
  Project: Project;
  type: string;
  evidence: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EvidenceParams {
  name?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateEvidenceType {
  projectId: string;
  type: string;
  evidence: string | File;
}
