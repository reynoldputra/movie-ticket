import { IsString } from "class-validator";

export class CancelOrderDTO {
  @IsString()
  paymentId!: string;
}
