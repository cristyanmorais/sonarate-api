export interface Account {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateAccountDTO {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateAccountDTO {
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
  password?: string;
} 