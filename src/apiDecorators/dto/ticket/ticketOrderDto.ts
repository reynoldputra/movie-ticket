import { Min, Max, IsDate, IsNumber } from "class-validator";

export class TicketOrderDTO {
  @IsNumber()
  scheduleId!: number;

  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Max(64, { each: true })
  seats!: number[];

  @IsDate()
  date!: Date;
}
