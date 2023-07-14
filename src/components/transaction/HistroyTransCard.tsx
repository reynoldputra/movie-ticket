import { Ticket } from "@/interfaces/Ticket";
import { TransHistory } from "@/interfaces/Transaction";
import { useState } from "react";
import TicketCard from "../ticket/TicketCard";
import { AiFillCloseSquare } from "react-icons/ai";
import clsxm from "@/lib/clsxm";
import nextApi from "@/lib/client/api";

interface HistoryTransCardProps {
  transaction: TransHistory;
}

export default function HistoryTransCard({ transaction }: HistoryTransCardProps) {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [detailTicket, setDetailTicket] = useState<Ticket | null>(null);

  const getMovie = async () => {
    if (transaction.payment) {
      const result = await nextApi().get("/api/ticket/p/" + transaction.payment?.id);
      setDetailTicket(result.data.data);
      setShowDetail(true);
    }
  };

  return (
    <div className="bg-white rounded flex flex-col w-full text-black py-2 px-4">
      <div className={transaction.payment ? "cursor-pointer" : ""} onClick={() => getMovie()}>
        <div className="w-full sm:flex justify-between text-lg font-bold">
          <p className={transaction.status?.color}>IDR {transaction.cash}</p>
          <div className="flex gap-2">
            <p>{transaction.type}</p>|
            <p className={transaction.status?.color}>{transaction.status?.tag}</p>
          </div>
        </div>
        <div className="w-full sm:flex justify-between text-sm text-slate-500">
          <p className="text-right sm:text-left sm:w-fit">{new Date(transaction.date).toDateString()}</p>
          <p className="text-right sm:text-left sm:w-fit">#{transaction.uid}</p>
        </div>
      </div>
      <div
        className={clsxm([
          "min-h-24 bg-blue-50 rounded my-2 flex flex-col gap-2 justify-center items-center p-4",
          showDetail ? "block" : "hidden",
        ])}
      >
        <div className="flex justify-between w-full">
          <p className="w-5"></p>
          <p className="font-bold text-slate-500">Ticket details</p>
          <AiFillCloseSquare
            className="cursor-pointer text-gray-400"
            onClick={() => setShowDetail(false)}
          />
        </div>
        {detailTicket && <TicketCard ticket={detailTicket} className="bg-transparent -px-4" />}
      </div>
    </div>
  );
}
