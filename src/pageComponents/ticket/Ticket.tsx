import Tabs from "@/components/Tabs";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import TicketCard from "@/components/ticket/TicketCard";
import { TabItem } from "@/interfaces/TabItem";
import { Ticket } from "@/interfaces/Ticket";
import nextApi from "@/lib/client/api";
import { useEffect, useState } from "react";

export default function Ticket() {
  const [activeTicket, setActive] = useState<Ticket[] | null>(null);
  const [historyTicket, setHistory] = useState<Ticket[] | null>(null);
  const TicketPanelClass = "flex flex-col gap-2";

  const getData = async () => {
    const result = await nextApi().get("/api/ticket/active")
    setActive(result.data.data)
    const result2 = await nextApi().get("/api/ticket/history")
    setHistory(result2.data.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const TicketTabMenu: TabItem[] = [
    {
      menu: "Active",
      content: (
        <div className={TicketPanelClass}>
          {activeTicket &&
            activeTicket.map((ticket, idx) => {
              return <TicketCard ticket={ticket} key={idx} />;
            })}
        </div>
      ),
    },
    {
      menu: "History",
      content: (
        <div className={TicketPanelClass}>
          {historyTicket &&
            historyTicket.map((ticket, idx) => {
              return <TicketCard ticket={ticket} key={idx} />;
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
