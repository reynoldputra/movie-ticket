
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import TicketCard from "@/components/ticket/TicketCard";
import { Ticket } from "@/interfaces/Ticket";


export default function History() {
  const tickets: Ticket[] = [
    {
      movie_title: "John Wick: Chapter 4",
      time: "12.05",
      date: "Monday, 3 July 2023",
      teater: "XXI PAKUWON CITY MALL",
      count_ticket: 4
    },
    {
      movie_title: "John Wick: Chapter 4",
      time: "12.05",
      date: "Monday, 3 July 2023",
      teater: "XXI PAKUWON CITY MALL",
      count_ticket: 4
    }
  ]

  return (
    <>
      <Grid className="pt-40">
        <Cell cols="1_full" className="w-full text-center text-2xl font-bold mb-6">
          <p>History Tickets</p>
        </Cell>
        {
          tickets.map((ticket, idx) => (
            <TicketCard ticket={ticket} key={idx} />
          ))
        }
      </Grid>
    </>
  )
}
