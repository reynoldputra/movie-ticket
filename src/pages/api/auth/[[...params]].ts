import { CreateUserDTO } from "@/apiDecorators/dto/auth/createUserDto";
import { LoginDTO } from "@/apiDecorators/dto/auth/loginDto";
import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import { Database } from "@/supabase/schema";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createHandler,
  Body,
  Post,
  ValidationPipe,
  Catch,
  HttpCode,
  Req,
  Res,
  BadRequestException,
} from "next-api-decorators";

@Catch(validationExceptionHandler)
class Auth {
  @HttpCode(201)
  @Post("/register")
  async createUser(@Body(ValidationPipe) body: CreateUserDTO): Promise<ResponseDTO> {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      );

      const { data, error } = await supabase.auth.admin.createUser({
        email: body.email,
        password: body.email,
        email_confirm: true,
      });

      if (error) throw new BadRequestException(error.message);

      return {
        status: true,
        message: "Success register new user",
      };
    } catch (err) {
      if (err instanceof BadRequestException)
        return {
          status: false,
          message: err.message,
        };
      else
        return {
          status: false,
          message: "Error occured",
          data: err,
        };
    }
  }

  @HttpCode(201)
  @Post("/login")
  async loginUser(@Body(ValidationPipe) loginDTO: LoginDTO) {
    return "test";
  }
}

export default createHandler(Auth);
