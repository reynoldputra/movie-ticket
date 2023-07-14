import { ResponseDTO } from "@/apiDecorators/dto/responseDto";
import validationExceptionHandler from "@/apiDecorators/exception/validationError";
import {
  createHandler,
  Catch,
  Get,
  UnauthorizedException,
  InternalServerErrorException,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  Req,
  Res,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { checkSession } from "@/lib/server/checkSesion";
import { TicketOrderDTO } from "@/apiDecorators/dto/ticket/ticketOrderDto";
import { Prisma, Ticket as TicketType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { formaterDate } from "@/lib/server/formatDate";

@Catch(validationExceptionHandler)
class Ticket {
  @Get("/active")
  async getActiveTickets() {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const currentDateTime = new Date();
      const res = await prisma.payment.findMany({
        where: {
          userId,
          status: "COMPLETE",
          tickets: {
            some: {
              date: {
                gt: currentDateTime,
              },
              schedule: {
                time: {
                  gt: currentDateTime,
                },
              },
            },
          },
        },
      });

      return {
        status: true,
        message: "Succes get active ticket",
        data: res,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Get("/history")
  async getTicketHistory() {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const currentDateTime = new Date();
      const res = await prisma.payment.findMany({
        where: {
          userId,
          status: "COMPLETE",
          tickets: {
            some: {
              date: {
                lt: currentDateTime,
              },
              schedule: {
                time: {
                  lt: currentDateTime,
                },
              },
            },
          },
        },
      });

      return {
        status: true,
        message: "Succes get ticket history",
        data: res,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Post("/order")
  async orderTicket(
    @Body(ValidationPipe) ticketOrderDto: TicketOrderDTO,
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ) {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const currentDateTime = new Date();
      const checkDate = Date.parse(ticketOrderDto.date);
      if (isNaN(checkDate)) throw new BadRequestException("Date is not valid");

      const date = formaterDate(ticketOrderDto.date);

      const bookedTickets = await prisma.ticket.findMany({
        where: {
          scheduleId: ticketOrderDto.scheduleId,
          date,
        },
        select: {
          seat: true,
        },
      });

      const bookedSeats = bookedTickets.map((t) => t.seat);

      if (bookedSeats.some((seat) => ticketOrderDto.seats.includes(seat)))
        throw new BadRequestException("Some of seats is booked");

      const movie = await prisma.movie.findFirstOrThrow({
        where: {
          schedules: {
            some: {
              id: ticketOrderDto.scheduleId,
            },
          },
        },
      });

      const userInfo = await prisma.user.findFirstOrThrow({
        where : {
          id : userId
        }
      })

      if(movie.age_rating > userInfo?.age) throw new BadRequestException("Age restricted")
      if(movie.price * ticketOrderDto.seats.length > userInfo?.balance) throw new BadRequestException("Low balance")

      await prisma.$transaction(async () => {
        const payment = await prisma.payment.create({
          data: {
            amount: movie.price * ticketOrderDto.seats.length,
            due_date: new Date(currentDateTime.getTime() + 15 * 60 * 1000),
            status: "WAITING",
            userId,
          },
        });

        const tickets: Prisma.TicketCreateManyInput[] = [];
        console.log(ticketOrderDto);
        for (let idx in ticketOrderDto.seats) {
          tickets.push({
            date: date,
            scheduleId: ticketOrderDto.scheduleId,
            paymentId: payment.id,
            seat: ticketOrderDto.seats[idx],
            userId,
          });
        }

        await prisma.ticket.createMany({
          data: tickets,
        });

      });

      return {
        status: true,
        message: "Success order tickets",
      };
    } catch (err) {
      console.log(err);
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      if (err instanceof BadRequestException) throw new BadRequestException(err.message);
      throw new InternalServerErrorException();
    }
  }

}

export default createHandler(Ticket);
