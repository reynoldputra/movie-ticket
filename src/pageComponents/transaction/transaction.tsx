import Tabs from "@/components/Tabs";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import TicketCard from "@/components/ticket/TicketCard";
import TicketTransCard from "@/components/transaction/TicketTransCard";
import { TabItem } from "@/interfaces/TabItem";
import { TicketTrans } from "@/interfaces/Transaction";

export default function Transaction() {
  const ticketsTrans: TicketTrans[] = [
    {
      uid: "adfas1231",
      cash: 123000,
      isIn: true,
      validDate: new Date("3-5-2023"),
    },
    {
      uid: "adfas1231",
      cash: 123000,
      isIn: true,
      validDate: new Date("3-5-2023"),
    },
  ];

  const transTabItem: TabItem[] = [
    {
      menu: "Waiting",
      content: (
        <div className="flex flex-col gap-2">
          {ticketsTrans.map((transaction, idx) => (
            <TicketTransCard transaction={transaction} key={idx} />
          ))}
        </div>
      ),
    },
    {
      menu : "History",
      content : (
      <div></div>
      )
    }
  ];

  return (
    <>
      <Grid className="pt-40">
        <Cell cols="1_full" className="w-full text-center text-2xl font-bold mb-6">
          <p>History Tickets</p>
        </Cell>
        <Cell cols="1_full" className="w-full flex justify-center">
          <Tabs items={transTabItem} />
        </Cell>
      </Grid>
    </>
  );
}
