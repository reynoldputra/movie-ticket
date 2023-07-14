import { PaymentMethod } from "@prisma/client";

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

export interface TopupInput {
  amount: number;
  paymentMethod: PaymentMethod;
}

export interface TicketOrderInput {
  scheduleId: number;
  date: string;
  seats: number[];
}
