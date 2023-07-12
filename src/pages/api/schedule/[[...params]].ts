import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  Query,
  NotFoundException,
  InternalServerErrorException,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { Prisma, Schedule as ScheduleType } from "@prisma/client";

@Catch(validationExceptionHandler)
class Schedule {
  @Get()
  async getAllSchedule(
    @Query("teaterId") teaterId?: string,
    @Query("movieId") movieId?: string,
  ): Promise<ResponseDTO> {
    try {
      let res: ScheduleType[];
      let condition: Prisma.ScheduleFindManyArgs = {};
      if (teaterId) condition.where = { ...condition.where, teaterId : parseInt(teaterId) };
      if (movieId) {
        condition.where = {
          ...condition.where,
          movieId: parseInt(movieId),
        };
      }
      res = await prisma.schedule.findMany(condition);
      if (!res) throw new NotFoundException();
      return {
        status: true,
        message: "Success get schedules",
        data: res,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Schedule);
