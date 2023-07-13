import { IsPaymentMethod } from "@/apiDecorators/validation/isPaymentMethod";
import { PaymentMethod } from "@prisma/client";
import { IsString } from "class-validator";

export class OrderDTO {
  @IsPaymentMethod()
  paymentMethod!: PaymentMethod;

  @IsString()
  paymentId!: string;
}
