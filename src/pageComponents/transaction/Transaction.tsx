import Tabs from "@/components/Tabs";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import TicketCard from "@/components/ticket/TicketCard";
import HistoryTransCard from "@/components/transaction/HistroyTransCard";
import TicketTransCard from "@/components/transaction/TicketTransCard";
import { TabItem } from "@/interfaces/TabItem";
import { TicketTrans, TransHistory } from "@/interfaces/Transaction";
import nextApi from "@/lib/client/api";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Transaction() {
  const [waitingPayment, setWaitingPayment] = useState<TicketTrans[] | null>(null);
  const [historyPayment, setHistoryPayment] = useState<TransHistory[] | null>(null);

  const getData = async () => {
    const active = await nextApi().get("/api/pay/active");
    setWaitingPayment(active.data.data);
    const history = await nextApi().get("/api/pay/history");
    const parsedTicket: TransHistory[] = history.data.data.map((h: TransHistory): TransHistory => {
      let color: string = "text-blue-600";
      h.status = {
        tag : PaymentStatus.COMPLETE,
        color : "text-green-400"
      }

      if (h.payment) {
        if (h.payment.status == PaymentStatus.CANCEL) color = "text-slate-600";
        if (h.payment.status == PaymentStatus.FAILED) color = "text-red-400";
        if (h.payment.status == PaymentStatus.COMPLETE) color = "text-green-400";
        return {
          ...h,
          status: {
            tag: h.payment.status,
            color,
          },
        };
      }

      return h;
    });
    setHistoryPayment(parsedTicket);
  };

  useEffect(() => {
    getData();
  }, []);

  const transTabItem: TabItem[] = [
    {
      menu: "Waiting",
      content: (
        <div className="flex flex-col gap-2">
          {waitingPayment &&
            waitingPayment.map((transaction, idx) => (
              <TicketTransCard transaction={transaction} key={idx} />
            ))}
        </div>
      ),
    },
    {
      menu: "History",
      content: (
        <div className="flex flex-col gap-2">
          {historyPayment &&
            historyPayment.map((transaction, idx) => (
              <HistoryTransCard transaction={transaction} key={idx} />
            ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <Grid className="pt-40">
        <Cell cols="1_full" className="w-full text-center text-2xl font-bold mb-6">
          <p>My Transactions</p>
        </Cell>
        <Cell cols="1_full" className="w-full flex justify-center">
          <Tabs items={transTabItem} />
        </Cell>
      </Grid>
    </>
  );
}
