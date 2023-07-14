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
  Res,
  Req,
  UseMiddleware,
  Param,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { checkSession } from "@/lib/server/checkSesion";
import { TransactionDTO } from "@/apiDecorators/dto/pay/transactionDto";
import { OrderDTO } from "@/apiDecorators/dto/pay/orderDto";
import type { NextApiRequest, NextApiResponse } from "next";

@Catch(validationExceptionHandler)
class Pay {
  @Get("/active")
  async getWaitingPayment(
    @Req() req : NextApiRequest,
    @Res() res : NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.payment.findMany({
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
        },
      });

      return {
        status: true,
        message: "Success get waiting transactions",
        data: result,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Get("/:paymentid")
  async getPaymentDetails(
    @Param('paymentid') paymentId : string,
    @Req() req : NextApiRequest,
    @Res() res : NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.payment.findFirstOrThrow({
        where: {
          userId,
          status: "WAITING",
          id: paymentId
        },
        select: {
          tickets: {
            select: {
              schedule: {
                select: {
                  movie: true,
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
        message: "Success get payment detail",
        data: result,
      };
    } catch (err) {
      console.log(err)
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
  @Catch(validationExceptionHandler)
  async topup(
    @Body(ValidationPipe) transactionDto: TransactionDTO,
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
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
        message: "Success topup balance",
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Post("/withdraw")
  @UseMiddleware()
  async withdraw(@Body(ValidationPipe) transactionDto: TransactionDTO): Promise<ResponseDTO> {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const currentBalance = await prisma.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });
      const currentBalanceInt = currentBalance?.balance ? currentBalance?.balance : 0;

      if (currentBalanceInt < transactionDto.amount)
        throw new BadRequestException("Current ballance is less than withdraw amount");

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
        message: "Success withdraw balance",
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      if (err instanceof BadRequestException) throw new BadRequestException(err.message);
      throw new InternalServerErrorException();
    }
  }

  @Post("/payorder")
  async payOrder(@Body(ValidationPipe) orderDto: OrderDTO): Promise<ResponseDTO> {
    try {
      const session = await checkSession();
      const userId = session.user.id;

      const paymentData = await prisma.payment.findUnique({
        where: {
          userId,
          id: orderDto.paymentId,
          status: "WAITING",
        },
      });

      if (!paymentData) throw new BadRequestException("Order not found");

      if (paymentData.due_date.getTime() > Date.now()) {
        await prisma.payment.update({
          where: {
            id: paymentData.id,
          },
          data: {
            status: "FAILED",
          },
        });
        throw new BadRequestException("Payment is expired");
      }

      await prisma.$transaction([
        prisma.transaction.create({
          data: {
            amount: paymentData.amount,
            method: orderDto.paymentMethod,
            type: "BUYTICKET",
            userId,
          },
        }),
        prisma.payment.update({
          where: {
            userId,
            id: orderDto.paymentId,
          },
          data: {
            status: "COMPLETE",
          },
        }),
      ]);

      return {
        status: true,
        message: "Success pay ticket order",
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      if (err instanceof BadRequestException) throw new BadRequestException(err.message);
      throw new InternalServerErrorException();
    }
  }

  @Post("/cancelorder")
  async cancelOrder(@Body(ValidationPipe) orderDto: OrderDTO): Promise<ResponseDTO> {
    try {
      const session = await checkSession();
      const userId = session.user.id;

      const paymentData = await prisma.payment.findUnique({
        where: {
          userId,
          id: orderDto.paymentId,
          status: "WAITING",
        },
      });

      if (!paymentData) throw new BadRequestException("Order not found");

      await prisma.$transaction([
        prisma.transaction.create({
          data: {
            amount: 0,
            method: orderDto.paymentMethod,
            type: "BUYTICKET",
            userId,
          },
        }),
        prisma.payment.update({
          where: {
            userId,
            id: orderDto.paymentId,
          },
          data: {
            status: "CANCEL",
          },
        }),
      ]);

      return {
        status: true,
        message: "Success cancel order",
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      if (err instanceof BadRequestException) throw new BadRequestException(err.message);
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Pay);
