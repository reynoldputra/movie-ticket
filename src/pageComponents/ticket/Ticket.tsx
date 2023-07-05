import Tabs from "@/components/Tabs";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import TicketCard from "@/components/ticket/TicketCard";
import { TabItem } from "@/interfaces/TabItem";
import { Ticket } from "@/interfaces/Ticket";

export default function Ticket() {
  const tickets: Ticket[] = [
    {
      uid: "asdas1231",
      movie_title: "John Wick: Chapter 4",
      time: "12.05",
      date: new Date("3-5-2023"),
      teater: "XXI PAKUWON CITY MALL",
      count_ticket: 4,
      orderId: "weqe121eqw",
      qr_url : ""
    },
    {
      uid: "asdas1231",
      movie_title: "John Wick: Chapter 4",
      time: "12.05",
      date: new Date("3-5-2023"),
      teater: "XXI PAKUWON CITY MALL",
      count_ticket: 4,
      orderId: "ada123jia",
      qr_url : ""
    },
  ];

  const TicketPanelClass = "flex flex-col gap-2"

  const TicketTabMenu: TabItem[] = [
    {
      menu: "Active",
      content: (
        <div className={TicketPanelClass}>
          {tickets.map((ticket, idx) => {
            if (ticket.date < new Date()) return <TicketCard ticket={ticket} key={idx} />;
          })}
        </div>
      ),
    },
    {
      menu: "History",
      content: (
        <div className={TicketPanelClass}>
          {tickets.map((ticket, idx) => {
            if (ticket.date > new Date()) return <TicketCard ticket={ticket} key={idx} />;
          })}
        </div>
      ),
    },
  ];

  return (
    <>
      <Grid className="pt-40">
        <Cell
          cols="1_full"
          className="w-full text-center text-2xl font-bold mb-6 flex justify-center"
        >
          <Tabs items={TicketTabMenu} />
        </Cell>
      </Grid>
    </>
  );
}
