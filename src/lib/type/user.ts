export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  password: string;
  image?: string;
}

export interface CreateUserType {
  name: string;
  email: string;
  password: string;
}
