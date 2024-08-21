export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  password: string;
  role: string;
  image?: string;
  createdAt: Date;
  _count?: {
    UserProjects: number;
    UnitProjects: number;
  };
}

export interface UserParams {
  name?: string | null;
  email?: string | null;
  start?: string | null;
  end?: string | null;
  page?: string | null;
  take?: string | null;
}

export interface CreateUserType {
  name: string;
  email: string;
  password?: string;
  role?: string;
  image?: string | File;
}
