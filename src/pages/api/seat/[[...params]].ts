import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  InternalServerErrorException,
  Param,
  BadRequestException,
  Query,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { formaterDate } from "@/lib/server/formatDate";

@Catch(validationExceptionHandler)
class Seat {
  @Get("/:scheduleId")
  async getSeats(@Param("scheduleId") scheduleId: string, @Query("date") date: string) : Promise<ResponseDTO> {
    try {
      const checkDate = Date.parse(date);
      if (isNaN(checkDate)) throw new BadRequestException("Date is not valid");
      if (isNaN(parseInt(scheduleId))) throw new BadRequestException("ScheduleId is not valid");
      const parsedDate = formaterDate(date);
      parsedDate.setUTCHours(0)
      console.log(scheduleId, parsedDate)
      const res = await prisma.ticket.findMany({
        where: {
          date : {
            equals : parsedDate
          },
          scheduleId : parseInt(scheduleId)
        },
        select: {
          seat : true
        },
      });

      console.log(res)

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
