export type CreateUserDto = {
  email: string;
  password: string;
  role: string;
}

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

