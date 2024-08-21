import { MaterialSectionType } from "./material-section";
import { ProjectType } from "./project";

export interface OfferSectionType {
  id: string;
  projectId: string;
  Project: ProjectType;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  MaterialSection: MaterialSectionType[];
}

export interface OfferSectionParams {
  name?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateOfferSectionType {
  projectId: string;
  title: string;
}
