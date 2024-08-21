import { MaterialType } from "./material";

export interface MaterialVariantType {
  id: string;
  name: string;
  slug: string;
  unit: string;
  price: string;
  service?: string;
  Material: MaterialType;
  materialId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialVariantParams {
  name?: string | null;
  unit?: string | null;
  materialId?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateMaterialVariantType {
  name: string;
  slug: string;
  unit: string;
  price: string;
  service?: string;
  materialId: string;
}
