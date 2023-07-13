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
} from "next-api-decorators";
import prisma from "@/lib/prisma";
import { checkSession } from "@/lib/server/checkSesion";
import { TicketOrderDTO } from "@/apiDecorators/dto/ticket/ticketOrderDto";
import { Prisma, Ticket as TicketType } from "@prisma/client";

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
  async orderTicket(@Body(ValidationPipe) ticketOrderDto: TicketOrderDTO) {
    try {
      const session = await checkSession();
      const userId = session.user.id;
      const currentDateTime = new Date();

      const bookedTickets = await prisma.ticket.findMany({
        where : {
          scheduleId : ticketOrderDto.scheduleId,
          date : ticketOrderDto.date
        },
        select : {
          seat : true
        }
      })

      const bookedSeats = bookedTickets.map((t) => t.seat) 

      if(bookedSeats.some(seat => ticketOrderDto.seats.includes(seat))) throw new BadRequestException("Some of seats is booked")

      const movie = await prisma.movie.findFirstOrThrow({
        where: {
          schedules: {
            some: {
              id: ticketOrderDto.scheduleId,
            },
          },
        },
      });

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
        for (let idx in ticketOrderDto.seats) {
          tickets.push({
            date: ticketOrderDto.date,
            scheduleId: ticketOrderDto.scheduleId,
            paymentId: payment.id,
            seat: ticketOrderDto.seats[idx],
            userId
          });
        }

        await prisma.ticket.createMany({
          data: tickets
        })
      });

      return {
        status: true,
        message: "Success order tickets",
      };
    } catch (err) {
      if (err instanceof UnauthorizedException) throw new UnauthorizedException();
      throw new InternalServerErrorException();
    }
  }
}

export default createHandler(Ticket);
