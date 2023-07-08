import { CreateUserDTO } from "@/apiDecorators/dto/auth/createUserDto";
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
    const supabaseServerClient = createPagesServerClient<Database>({ req, res });
    const { data: dataSignUp, error: errorSignUp } = await supabaseServerClient.auth.signUp({
      email: body.email,
      password: body.email,
    });

    if (errorSignUp || !dataSignUp.user) throw new BadRequestException(errorSignUp?.message);

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
    const { data: _, error: confirmEmailError } = await supabase.auth.admin.updateUserById(
      dataSignUp.user.id,
      {
        email_confirm: true,
      }
    );

    if (confirmEmailError) throw new BadRequestException(confirmEmailError?.message);

    return {
      status: true,
      message: "Success register new user",
    };
  }
}

export default createHandler(Auth);
