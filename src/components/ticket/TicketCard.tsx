import { Ticket } from "@/interfaces/Ticket";
import Cell from "../layout/cell";
import clsxm from "@/lib/clsxm";

interface TicketCardProps {
  ticket: Ticket,
  className? : string
}

export default function TicketCard({ ticket, className = "" }: TicketCardProps) {
  return (
    <div className={clsxm([
      "bg-white rounded flex flex-col w-full text-black py-2 px-4",
      className
    ])}>
      <div className="w-full flex justify-between text-lg font-bold">
        <p>{ticket.movie.title}</p>
        <p>{ticket.count_ticket}</p>
      </div>
      <div className="w-full flex justify-between text-sm text-slate-500">
        <p>{ticket.time} | {ticket.date.toDateString()}</p>
        <p>{ticket.teater}</p>
      </div>
    </div>
  )
}
