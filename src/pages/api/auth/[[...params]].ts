import { CreateUserDTO } from "@/apiDecorators/dto/auth/createUserDto";
import { LoginDTO } from "@/apiDecorators/dto/auth/loginDto";
import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import { Database } from "@/supabase/schema";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import {
  createHandler,
  Body,
  Post,
  ValidationPipe,
  Catch,
  BadRequestException,
} from "next-api-decorators";

@Catch(validationExceptionHandler)
class Auth {
  @Post("/register")
  async createUser(@Body(ValidationPipe) body: CreateUserDTO): Promise<ResponseDTO> {
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

    const { data : _, error } = await supabase.auth.admin.createUser({
      email: body.email,
      password: body.email,
      email_confirm: true,
    });

    if (error) throw new BadRequestException(error.message);

    return {
      status: true,
      message: "Success register new user",
    };
  }
}

export default createHandler(Auth);
