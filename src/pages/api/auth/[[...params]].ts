import { CreateUserDTO } from "@/apiDecorators/dto/auth/createUserDto";
import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import {
  createHandler,
  Body,
  Post,
  ValidationPipe,
  Catch,
  BadRequestException,
  Res,
  Req,
} from "next-api-decorators";

@Catch(validationExceptionHandler)
class Auth {
  @Post("/register")
  async createUser(
    @Body(ValidationPipe) body: CreateUserDTO,
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ): Promise<ResponseDTO> {

    try {
      const res = await prisma.user.create({
        data : body
      })

      return {
        message : "Success creating new user" 
      }
    } catch (err) {
      console.log(err)
      throw new Error("There is an error")
    }
  }
}

export default createHandler(Auth);
