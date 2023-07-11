import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  InternalServerErrorException,
  Param,
  ParseNumberPipe,
  BadRequestException,
} from "next-api-decorators";
import prisma from "@/lib/prisma";

@Catch(validationExceptionHandler)
class Movie {
  @Get()
  async getMovies(): Promise<ResponseDTO> {
    try {
      const res = await prisma.movie.findMany();
      return {
        status: true,
        message: "Success get all movies",
        data: res,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  @Get("/:id")
  async getMovie(@Param("id", ParseNumberPipe) id: number): Promise<ResponseDTO> {
    console.log(id)
    try {
      const res = await prisma.movie.findUnique({
        where: {
          id : id
        },
      });
      if(!res) throw new BadRequestException("Movie not found")
      return {
        status: true,
        message: "Success get one movie",
        data: res,
      };
    } catch (err) {
      console.log(err);
      if(err instanceof BadRequestException) throw new BadRequestException("Movie not found")
      throw new InternalServerErrorException();
    }
  }

  @Get("/m/:slug")
  async getMovieBySlug(@Param("slug") slug: string): Promise<ResponseDTO> {
    try {
      const res = await prisma.movie.findUnique({
        where: {
          slug
        },
      });
      if(!res) throw new BadRequestException("Movie not found")
      return {
        status: true,
        message: "Success get one movie by slug",
        data: res,
      };
    } catch (err) {
      console.log(err);
      if(err instanceof BadRequestException) throw new BadRequestException("Movie not found")
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Movie);
