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
      time: "12.05",
      date: new Date("3-5-2023"),
      teater: "XXI PAKUWON CITY MALL",
      count_ticket: 4,
      orderId: "weqe121eqw",
      qr_url: "",
      movie: {
        id: 2,
        title: "The Super Mario Bros. Movie",
        description:
          "Ketika sedang bekerja di bawah tanah untuk memperbaiki pipa air, Mario dan Luigi, yang merupakan tukang ledeng dari Brooklyn, tiba-tiba terhisap ke dalam pipa misterius dan masuk ke dunia yang sangat berbeda. Mereka berada di tempat yang ajaib dan aneh. Tapi sayangnya, mereka terpisah satu sama lain. Mario memulai petualangan besar untuk mencari dan menemukan Luigi.",
        release_date: new Date("2023-04-05"),
        poster_url: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        age_rating: 14,
        price: 49000,
      },
    },
    {
      uid: "asdas1231",
      time: "12.05",
      date: new Date("3-5-2023"),
      teater: "XXI PAKUWON CITY MALL",
      count_ticket: 4,
      orderId: "weqe121eqw",
      qr_url: "",
      movie: {
        id: 2,
        title: "The Super Mario Bros. Movie",
        description:
          "Ketika sedang bekerja di bawah tanah untuk memperbaiki pipa air, Mario dan Luigi, yang merupakan tukang ledeng dari Brooklyn, tiba-tiba terhisap ke dalam pipa misterius dan masuk ke dunia yang sangat berbeda. Mereka berada di tempat yang ajaib dan aneh. Tapi sayangnya, mereka terpisah satu sama lain. Mario memulai petualangan besar untuk mencari dan menemukan Luigi.",
        release_date: new Date("2023-04-05"),
        poster_url: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        age_rating: 14,
        price: 49000,
      },
    },
  ];

  const TicketPanelClass = "flex flex-col gap-2";

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
