import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  Query,
  NotFoundException,
  InternalServerErrorException,
  ValidationPipe,
  Body,
  BadRequestException,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { Prisma, Schedule as ScheduleType, Teater } from "@prisma/client";

interface ScheduleInTheater {
  teater: Teater;
  schedules: unknown[];
}

@Catch(validationExceptionHandler)
class Schedule {
  @Get()
  async getAllSchedule(
    @Query("movieId") movieId?: string,
    @Query("city") city?: string,
    @Query("date") date?: string
  ): Promise<ResponseDTO> {
    try {
      if (!movieId || !city || !date) throw new BadRequestException("Query params not valid");

      const schedules = await prisma.schedule.findMany({
        where: {
          teater: {
            city,
          },
          movieId: parseInt(movieId),
          end_date: {
            gte: new Date(date),
          },
          start_date: {
            lte: new Date(date),
          },
        },
      });

      const theaters = await prisma.teater.findMany({
        where: {
          city,
        },
      });

      const filteredSchedule: ScheduleInTheater[] = [];
      for (let theaterIdx in theaters) {
        let schedulePerTheater: unknown[] = [];
        for (let scheduleIdx in schedules) {
          if (schedules[scheduleIdx].teaterId == theaters[theaterIdx].id) {
            const sched = schedules[scheduleIdx];
            let checkDateScedh = new Date(sched.time);
            const userDate = new Date(date);
            const currentDate = new Date();
            if (currentDate.toLocaleDateString() == userDate.toLocaleDateString()) {
              if (checkDateScedh.getTime() > new Date().getTime()) schedulePerTheater.push(sched);
            } else {
              schedulePerTheater.push(sched);
            }
          }
        }
        filteredSchedule.push({ teater: theaters[theaterIdx], schedules: schedulePerTheater });
      }

      if (!filteredSchedule) throw new NotFoundException();
      return {
        status: true,
        message: "Success get schedules",
        data: filteredSchedule,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Schedule);
