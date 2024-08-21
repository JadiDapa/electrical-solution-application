import { ProjectType } from "./project";
import { MaterialType } from "./material";
import { MaterialVariantType } from "./material-variant";

export interface MaterialCalculationType {
  id: string;
  MaterialVariant: MaterialVariantType;
  materialVariantId: string;
  Project: ProjectType;
  projectId: string;
  quantity: number;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  Material?: MaterialType;
}

export interface MaterialCalculationParams {
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateMaterialCalculationType {
  materialVariantId?: string;
  projectId?: string;
  quantity?: number;
  status?: string;
}
