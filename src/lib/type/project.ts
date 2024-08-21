import { UserType } from "./user";

export interface ProjectType {
  id: string;
  type: string;
  level?: string;
  name: string;
  phone_number: string;
  address: string;
  city: string;
  province: string;
  instance: string;
  rates: string;
  power: string;
  needs: string;
  status: string;
  evidence: string;
  price: string;
  unit_handler: string;
  drawing?: string;
  Unit: UserType;
  userId: string;
  User: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectParams {
  name?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateProjectType {
  type?: string;
  level?: string;
  name?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  province?: string;
  instance?: string;
  rates?: string;
  power?: string;
  needs?: string;
  status?: string;
  drawing?: string;
  evidence?: string;
  price?: string;
  unit_handler?: string;
  userId?: string;
}
