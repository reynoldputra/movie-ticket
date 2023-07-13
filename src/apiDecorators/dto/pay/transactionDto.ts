import { IsPaymentMethod } from "@/apiDecorators/validation/isPaymentMethod";
import { PaymentMethod } from "@prisma/client";
import { IsNumber, Min } from "class-validator";

export class TransactionDTO {
  @IsNumber()
  @Min(30000)
  amount!: number

  @IsPaymentMethod()
  paymentMethod!: PaymentMethod
}
