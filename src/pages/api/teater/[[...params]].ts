import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  NotFoundException,
  InternalServerErrorException,
  Query,
  ParseNumberPipe,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { Prisma, Teater as TeaterType } from "@prisma/client";

@Catch(validationExceptionHandler)
class Teater {
  @Get()
  async getAllTeater(
    @Query("city") city?: string,
    @Query("movieId") movieId?: string
  ): Promise<ResponseDTO> {
    try {
      let res: TeaterType[];
      let condition: Prisma.TeaterFindManyArgs = {};
      if (city) condition.where = { ...condition.where, city };
      if (movieId) {
        condition.where = {
          ...condition.where,
          schedules: { some: { movieId: parseInt(movieId) } },
        };
      }
      res = await prisma.teater.findMany(condition);
      if (!res) throw new NotFoundException();
      return {
        status: true,
        message: "Success get teaters",
        data: res,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }

  @Get("/city")
  async getTeaterCities() {
    try {
      const res = await prisma.teater.findMany({ select: { city: true } });
      if (!res) throw new NotFoundException();
      const cities : string[] = []
      res.forEach((data) => {
        if(!cities.includes(data.city)) cities.push(data.city)
      } )
      return {
        status: true,
        message: "Success get cities",
        data: cities
      };
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Teater);
