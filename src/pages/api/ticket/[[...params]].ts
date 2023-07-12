import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
} from "next-api-decorators";
import prisma from "@/lib/prisma";

@Catch(validationExceptionHandler)
class Ticket {

}

export default createHandler(Ticket);
