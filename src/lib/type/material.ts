import { MaterialVariantType } from "./material-variant";

export interface MaterialType {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  _count: { MaterialVariant: number };
  MaterialVariant: MaterialVariantType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialParams {
  name?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateMaterialType {
  name: string;
  slug: string;
  description?: string;
  image: string | File;
}
