const bcrypt = require("bcryptjs");
import { CreateUserDTO } from "@/apiDecorators/dto/auth/createUserDto";
import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import prisma from "@/lib/prisma";
import {
  createHandler,
  Body,
  Post,
  ValidationPipe,
  Catch,
  InternalServerErrorException,
  Get,
} from "next-api-decorators";
import { Prisma } from "@prisma/client";
import { checkSession } from "@/lib/server/checkSesion";

@Catch(validationExceptionHandler)
class Auth {
  @Post("/register")
  async createUser(@Body(ValidationPipe({
    validationError: {
      target : true
    }
  })) body: CreateUserDTO): Promise<ResponseDTO> {
    let salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    try {
      await prisma.user.create({
        data: {
          email: body.email,
          username: body.username,
          name: body.name,
          password: body.password,
          age: body.age,
          balance: body.balance,
        },
      });

      return {
        status: true,
        message: "Success creating new user",
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == "P2002") {
          let message = "";
          if (err.meta?.target == "User_email_key") message = "Email is already registered";
          if (err.meta?.target == "User_username_key") message = "Username is already registered";
          throw new Error(message);
        }
      }
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  @Get("/balance")
  async getBalanceInfo(): Promise<ResponseDTO> {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const res = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          balance: true,
        },
      });

      return {
        status: true,
        message: "Success get user balance info",
        data: res,
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Auth);
