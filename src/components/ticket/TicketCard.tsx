import { Ticket } from "@/interfaces/Ticket";
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
        <p>x{ticket.count_ticket}</p>
      </div>
      <div className="w-full md:flex justify-between text-sm text-slate-500">
        <p>{ticket.time} | {new Date(ticket.date).toDateString()}</p>
        <p>{ticket.teater}</p>
      </div>
    </div>
  )
}
