import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  UnauthorizedException,
  InternalServerErrorException,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { checkSession } from "@/lib/server/checkSesion";

@Catch(validationExceptionHandler)
class Ticket {
  @Get("/active")
  async getActiveTickets () {
    try {
      const session = await checkSession()
      const userId = session.user.id
      const currentDateTime = new Date()
      const res = await prisma.ticket.findMany({
        where : {
          userId,
          payment : {
            status : "COMPLETE"
          },
          date : {
            gt : currentDateTime
          },
          schedule : {
            time : {
              gt : currentDateTime
            }
          }
        }
      })

      return {
        status : true,
        message : "Succes get active ticket",
        data : res
      }
    } catch (err) {
      if(err instanceof UnauthorizedException) throw new UnauthorizedException
      throw new InternalServerErrorException();
    }
  }
  
  @Get("/history")
  async getTicketHistoru () {
    try {
      const session = await checkSession()
      const userId = session.user.id
      const currentDateTime = new Date()
      const res = await prisma.ticket.findMany({
        where : {
          userId,
          payment : {
            status : "COMPLETE"
          },
          date : {
            lt : currentDateTime
          },
          schedule : {
            time : {
              lt : currentDateTime
            }
          }
        }
      })

      return {
        status : true,
        message : "Succes get ticket history",
        data : res
      }
    } catch (err) {
      if(err instanceof UnauthorizedException) throw new UnauthorizedException
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Ticket);
