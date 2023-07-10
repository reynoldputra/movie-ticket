export interface RegisterInput {
  email: string;
  name: string;
  username: string;
  age: number;
  password: string;
  confirmPassword: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
