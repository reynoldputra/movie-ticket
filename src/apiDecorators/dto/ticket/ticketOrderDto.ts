import { Min, Max, IsDate, IsNumber, IsString } from "class-validator";

export class TicketOrderDTO {
  @IsNumber()
  scheduleId!: number;

  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Max(64, { each: true })
  seats!: number[];

  @IsString()
  date!: string;
}
