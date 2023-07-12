import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  Query,
  NotFoundException,
  InternalServerErrorException,
  UnauthorizedException,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { Prisma, Schedule as ScheduleType } from "@prisma/client";
import { checkSession } from "@/lib/server/checkSesion";

@Catch(validationExceptionHandler)
class Pay {
  @Get("/active")
  async getWaitingPayment() {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const res = await prisma.payment.findMany({
        where: {
          userId,
          status: "WAITING",
        },
        select: {
          tickets: {
            select: {
              schedule: {
                select: {
                  movie: {
                    select: { title: true },
                  },
                  time: true,
                  teater: {
                    select: { name: true },
                  },
                },
              },
              date: true,
            },
          },
          transaction: {
            select: {
              amount: true,
              date: true,
            },
          },
        },
      });

      return {
        status: true,
        message: "Success get waiting transactions",
        data: res,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Get("/history")
  async getHistoryTransaction() {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const res = await prisma.transaction.findMany({
        where: {
          userId,
          Payment: {
            isNot: {
              status: "WAITING",
            },
          },
        },
        select: {
          Payment: {
            select: {
              tickets: {
                select: {
                  schedule: {
                    select: {
                      movie: {
                        select: { title: true },
                      },
                      time: true,
                      teater: {
                        select: { name: true },
                      },
                    },
                  },
                  date: true,
                },
              },
              transaction: {
                select: {
                  amount: true,
                  date: true,
                },
              },
            },
          },
        },
      });

      return {
        status: true,
        message: "Success get history transaction",
        data: res,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Pay);
