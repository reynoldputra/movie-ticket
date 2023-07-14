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
import { TicketTrans, TransHistory } from "@/interfaces/Transaction";

@Catch(validationExceptionHandler)
class Pay {
  @Get("/active")
  async getWaitingPayment(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.payment.findMany({
        where: {
          userId,
          status: "WAITING",
          due_date: {
            gt: new Date(),
          },
        },
      });

      const waitingPayemnt: TicketTrans[] = result.map((p) => {
        return {
          uid: p.id,
          cash: p.amount,
          validDate: p.due_date,
        };
      });

      return {
        status: true,
        message: "Success get waiting transactions",
        data: waitingPayemnt,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Get("/history")
  async getHistoryTransaction(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.transaction.findMany({
        include: {
          payment: true,
        },
        where: {
          userId,
          payment: {
            isNot: {
              status: "WAITING",
            },
          },
        },
      });

      const historyTicket: TransHistory[] = result.map((t) => {
        let data: TransHistory = {
          uid: t.id,
          cash: t.amount,
          type: t.type as string,
          date: t.date,
        };
        if (t.payment) {
          data = {
            ...data,
            payment: {
              status: t.payment?.status,
              id: t.payment?.id,
            },
          };
        }
        return data;
      });

      return {
        status: true,
        message: "Success get history transaction",
        data: historyTicket,
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
  async withdraw(
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
  async payOrder(
    @Body(ValidationPipe) orderDto: OrderDTO,
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;

      const paymentData = await prisma.payment.findUnique({
        where: {
          userId,
          id: orderDto.paymentId,
          status: "WAITING",
        },
      });

      if (!paymentData) throw new BadRequestException("Order not found");

      console.log(paymentData.due_date.toLocaleString(), paymentData.due_date.getTime());
      console.log(new Date().toLocaleString(), new Date().getTime());
      if (paymentData.due_date.getTime() < new Date().getTime()) {
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

      await prisma.$transaction(async (tx) => {
        const transaction = await tx.transaction.create({
          data: {
            amount: paymentData.amount,
            method: orderDto.paymentMethod,
            type: "BUYTICKET",
            userId,
          },
        });
        await tx.payment.update({
          where: {
            userId,
            id: orderDto.paymentId,
          },
          data: {
            status: "COMPLETE",
            transactionId: transaction.id,
          },
        });

        const user = await tx.user.findFirstOrThrow({
          where: {
            id: userId,
          },
        });

        await tx.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: user.balance - paymentData.amount,
          },
        });
      });

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
  async cancelOrder(
    @Body(ValidationPipe) orderDto: OrderDTO,
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
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

  @Get("/:paymentid")
  async getPaymentDetails(
    @Param("paymentid") paymentId: string,
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ): Promise<ResponseDTO> {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.payment.findFirstOrThrow({
        where: {
          userId,
          status: "WAITING",
          id: paymentId,
        },
        include: {
          tickets: true,
        },
      });

      const scheduleRes = await prisma.schedule.findFirstOrThrow({
        where: {
          id: result.tickets[0].scheduleId,
        },
        include: {
          movie: true,
          teater: true,
        },
      });

      const movieRes = await prisma.movie.findFirstOrThrow({
        where: {
          id: scheduleRes.movieId,
        },
      });

      const seats = result.tickets.map((t) => t.seat);

      return {
        status: true,
        message: "Success get payment detail",
        data: {
          ticketDetail: {
            time: scheduleRes.time,
            date: result.tickets[0].date,
            teater: scheduleRes.teater.name,
            count_ticket: result.tickets.length,
            orderId: paymentId,
            qr_url: "",
            movie: movieRes,
            seats,
          },
          paymentDetail: {
            due_date: result.due_date,
            amount: result.amount,
          },
        },
      };
    } catch (err) {
      console.log(err);
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Pay);
