import { OfferSection, Project } from "@prisma/client";
import { MaterialVariantType } from "./material-variant";
import { ProjectType } from "./project";

export interface MaterialSectionType {
  id: string;
  variantId: string;
  MaterialVariant: MaterialVariantType;
  offerId: string;
  OfferSection: OfferSection;
  projectId: string;
  Project: Project;
  quantity: number;
  useService?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialSectionParams {
  name?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateMaterialSectionType {
  variantId: string;
  offerId: string;
  projectId: string;
  quantity: Number;
  useService?: string;
}
