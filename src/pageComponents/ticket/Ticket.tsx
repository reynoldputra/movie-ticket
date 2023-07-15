import ConfirmModal from "@/components/ConfirmModal";
import Tabs from "@/components/Tabs";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import TicketCard from "@/components/ticket/TicketCard";
import { TabItem } from "@/interfaces/TabItem";
import { Ticket } from "@/interfaces/Ticket";
import nextApi from "@/lib/client/api";
import { refundOrderPost } from "@/lib/client/refundOrderPost";
import { useEffect, useState } from "react";
import {RiRefund2Fill} from "react-icons/ri"

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

  const refundTicket = async (id : string) => {
    await refundOrderPost({
      paymentId : id
    })
  }

  const TicketTabMenu: TabItem[] = [
    {
      menu: "Active",
      content: (
        <div className={TicketPanelClass}>
          {activeTicket &&
            activeTicket.map((ticket, idx) => {
              return (
                <div key={idx} className="flex items-center gap-4">
                  <TicketCard ticket={ticket} key={idx} />
                  <ConfirmModal title={<div className="h-full relative w-5 text-red-600 pr-2"><RiRefund2Fill /></div>} trigger={() => {refundTicket(ticket.orderId)}}>
                    Are you sure want to refund this ticket ? 
                  </ConfirmModal>
                </div>
              );
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
