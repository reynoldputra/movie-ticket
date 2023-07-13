import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  InternalServerErrorException,
  UnauthorizedException,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { checkSession } from "@/lib/server/checkSesion";
import { TransactionDTO } from "@/apiDecorators/dto/pay/transactionDto";

@Catch(validationExceptionHandler)
class Pay {
  @Get("/active")
  async getWaitingPayment(): Promise<ResponseDTO> {
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
  async getHistoryTransaction(): Promise<ResponseDTO> {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const res = await prisma.transaction.findMany({
        where: {
          userId,
          payment: {
            isNot: {
              status: "WAITING",
            },
          },
        },
        select: {
          payment: {
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

  @Post("/topup")
  async topup(@Body(ValidationPipe) transactionDto: TransactionDTO): Promise<ResponseDTO> {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const currentBalance = await prisma.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });
      const currentBalanceInt = currentBalance?.balance ? currentBalance?.balance : 0;

      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: currentBalanceInt + transactionDto.amount,
          },
        }),
        prisma.transaction.create({
          data: {
            amount: transactionDto.amount,
            method: transactionDto.paymentMethod,
            type: "TOPUP",
            userId,
          },
        }),
      ]);

      return {
        status: true,
        message: "Success get history transaction",
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Post("/withdraw")
  async withdraw(@Body(ValidationPipe) transactionDto: TransactionDTO): Promise<ResponseDTO> {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const currentBalance = await prisma.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });
      const currentBalanceInt = currentBalance?.balance ? currentBalance?.balance : 0;

      if(currentBalanceInt < transactionDto.amount) throw new BadRequestException("Current ballance is less than withdraw amount")

      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: currentBalanceInt - transactionDto.amount,
          },
        }),
        prisma.transaction.create({
          data: {
            amount: -transactionDto.amount,
            method: transactionDto.paymentMethod,
            type: "WITHDRAW",
            userId,
          },
        }),
      ]);

      return {
        status: true,
        message: "Success get history transaction",
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      if (err instanceof BadRequestException) throw new BadRequestException(err.message);
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Pay);
