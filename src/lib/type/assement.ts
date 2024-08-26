export interface AssementType {
  id: string;
  title: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAssementType {
  title: string;
  price: string;
}
