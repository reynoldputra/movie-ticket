import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  InternalServerErrorException,
  Param,
  BadRequestException,
} from "next-api-decorators";
import prisma from "@/lib/prisma";

@Catch(validationExceptionHandler)
class Seat {
  @Get("/:scheduleId/:date")
  async getSeats(@Param("scheduleId") scheduleId: string, @Param("date") date: string) : Promise<ResponseDTO> {
    try {
      const checkDate = Date.parse(date);
      if (isNaN(checkDate)) throw new BadRequestException("Date is not valid");
      if (isNaN(parseInt(scheduleId))) throw new BadRequestException("ScheduleId is not valid");
      const parsedDate = new Date(date);
      const res = await prisma.ticket.findMany({
        where: {
          AND: [{ scheduleId: parseInt(scheduleId) }, { date: parsedDate }],
        },
        select: {
          seat : true
        },
      });

      const seats = res.map(seat => seat.seat)
      return {
        status : true,
        message : "Succes get seats",
        data : seats
      }
    } catch (err) {
      console.log(err);
      if (err instanceof BadRequestException) throw new BadRequestException(err.message);
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Seat);
