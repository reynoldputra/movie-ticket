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
  Param,
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { checkSession } from "@/lib/server/checkSesion";
import { TicketOrderDTO } from "@/apiDecorators/dto/ticket/ticketOrderDto";
import { Prisma, Ticket as TicketType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Ticket as TTicket } from "@/interfaces/Ticket";
import { JwtAuthGuard } from "@/apiDecorators/decorator/auth";

@Catch(validationExceptionHandler)
class Ticket {
  @Get("/p/:paymentid")
  @JwtAuthGuard()
  async getPaymentDetail(
    @Param("paymentid") id: string,
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse
  ) {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.payment.findFirstOrThrow({
        include: {
          tickets: {
            include: {
              schedule: {
                include: {
                  teater: true,
                  movie: true,
                },
              },
            },
          },
        },
        where: {
          id,
          userId,
        },
      });

      const ticket = result.tickets[0];
      const schedule = ticket.schedule;
      const teater = schedule.teater;

      const ticketData = {
        time: schedule.time.toLocaleTimeString(),
        date: ticket.date,
        teater: teater.name,
        count_ticket: result.tickets.length,
        orderId: result.id,
        qr_url: "",
        movie: schedule.movie,
        seats: result.tickets.map((t) => t.seat),
      };

      return {
        status: true,
        message: "Succes get payment info",
        data: ticketData,
      };
    } catch (err) {
      console.log(err);
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }
  @Get("/active")
  @JwtAuthGuard()
  async getActiveTickets(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.payment.findMany({
        include: {
          tickets: {
            include: {
              schedule: {
                include: {
                  teater: true,
                  movie: true,
                },
              },
            },
          },
        },
        where: {
          userId,
          status: "COMPLETE",
          tickets: {
            some: {
              date: {
                gt: new Date(),
              },
            },
          },
        },
      });

      const ticketGroup: TTicket[] = result.map((w): TTicket => {
        const ticket = w.tickets[0];
        const schedule = ticket.schedule;
        const teater = schedule.teater;

        return {
          time: schedule.time.toLocaleTimeString(),
          date: ticket.date,
          teater: teater.name,
          count_ticket: w.tickets.length,
          orderId: w.id,
          qr_url: "",
          movie: schedule.movie,
          seats: w.tickets.map((t) => t.seat),
        };
      });

      return {
        status: true,
        message: "Succes get active ticket",
        data: ticketGroup,
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }

  @Get("/history")
  async getTicketHistory(@Req() req: NextApiRequest, @Res() res: NextApiResponse) {
    try {
      const session = await checkSession(req, res);
      const userId = session.user.id;
      const result = await prisma.payment.findMany({
        include: {
          tickets: {
            include: {
              schedule: {
                include: {
                  teater: true,
                  movie: true,
                },
              },
            },
          },
        },
        where: {
          userId,
          status: "COMPLETE",
          tickets: {
            some: {
              date: {
                lt: new Date(),
              },
            },
          },
        },
      });

      const ticketGroup: TTicket[] = result.map((w): TTicket => {
        const ticket = w.tickets[0];
        const schedule = ticket.schedule;
        const teater = schedule.teater;

        return {
          time: schedule.time.toLocaleTimeString(),
          date: ticket.date,
          teater: teater.name,
          count_ticket: w.tickets.length,
          orderId: w.id,
          qr_url: "",
          movie: schedule.movie,
          seats: w.tickets.map((t) => t.seat),
        };
      });

      return {
        status: true,
        message: "Succes get history ticket",
        data: ticketGroup,
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

      const sched = await prisma.schedule.findFirstOrThrow({
        where: {
          id: ticketOrderDto.scheduleId,
        },
        select: {
          time: true,
        },
      });

      const ticketDate = new Date(ticketOrderDto.date);
      ticketDate.setHours(sched.time.getHours());
      ticketDate.setMinutes(sched.time.getMinutes());
      ticketDate.setSeconds(0);
      ticketDate.setMilliseconds(0);

      const bookedTickets = await prisma.ticket.findMany({
        where: {
          scheduleId: ticketOrderDto.scheduleId,
          date: ticketDate,
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
        where: {
          id: userId,
        },
      });

      if (movie.age_rating > userInfo?.age) throw new BadRequestException("Age restricted");

      const newPayment = await prisma.$transaction(async () => {
        const payment = await prisma.payment.create({
          data: {
            amount: movie.price * ticketOrderDto.seats.length,
            due_date: new Date(currentDateTime.getTime() + 15 * 60 * 1000),
            status: "WAITING",
            userId,
          },
        });

        const tickets: Prisma.TicketCreateManyInput[] = [];
        for (let idx in ticketOrderDto.seats) {
          tickets.push({
            date: ticketDate,
            scheduleId: ticketOrderDto.scheduleId,
            paymentId: payment.id,
            seat: ticketOrderDto.seats[idx],
            userId,
          });
        }

        await prisma.ticket.createMany({
          data: tickets,
        });

        return payment;
      });

      return {
        status: true,
        message: "Success order tickets",
        data: {
          id: newPayment.id,
        },
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
