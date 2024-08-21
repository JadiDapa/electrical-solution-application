import { Project } from "@prisma/client";

export interface OfferType {
  id: string;
  projectId: string;
  Project: Project;
  customer: string;
  address: string;
  quote: string;
  validity: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfferParams {
  name?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateOfferType {
  projectId: string;
  customer: string;
  address: string;
  quote: string;
  validity: string;
}
