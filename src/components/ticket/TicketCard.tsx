import { Ticket } from "@/interfaces/Ticket";
import Cell from "../layout/cell";

interface TicketCardProps {
  ticket: Ticket
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="bg-white rounded flex flex-col w-full text-black py-2 px-4">
      <div className="w-full flex justify-between text-lg font-bold">
        <p>{ticket.movie_title}</p>
        <p>{ticket.count_ticket}</p>
      </div>
      <div className="w-full flex justify-between text-sm text-slate-500">
        <p>{ticket.time} | {ticket.date.toDateString()}</p>
        <p>{ticket.teater}</p>
      </div>
    </div>
  )
}
