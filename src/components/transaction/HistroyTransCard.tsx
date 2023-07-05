import { Ticket } from "@/interfaces/Ticket";
import { TransHistory } from "@/interfaces/Transaction";
import { useState } from "react";
import TicketCard from "../ticket/TicketCard";
import { AiFillCloseSquare } from "react-icons/ai";
import clsxm from "@/lib/clsxm";

interface HistoryTransCardProps {
  transaction: TransHistory;
}

export default function HistoryTransCard({ transaction }: HistoryTransCardProps) {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const detailTicket: Ticket = {
    uid: "asdas1231",
    movie_title: "John Wick: Chapter 4",
    time: "12.05",
    date: new Date("3-5-2023"),
    teater: "XXI PAKUWON CITY MALL",
    count_ticket: 4,
    orderId: "weqe121eqw",
    qr_url:
  };

  return (
    <div className="bg-white rounded flex flex-col w-full text-black py-2 px-4">
      <div className="cursor-pointer" onClick={() => setShowDetail(true)}>
        <div className="w-full flex justify-between text-lg font-bold">
          <div className="flex gap-2">
            <p>{transaction.type}</p>|
            <p className={transaction.status.color}>{transaction.status.tag}</p>
          </div>
          <p className={transaction.status.color}>IDR {transaction.cash}</p>
        </div>
        <div className="w-full flex justify-between text-sm text-slate-500">
          <p>{transaction.date.toDateString()}</p>
          <p>#{transaction.uid}</p>
        </div>
      </div>
      <div
        className={clsxm([
          "min-h-24 bg-blue-50 rounded my-2 flex flex-col gap-2 justify-center items-center p-4",
          showDetail ? "block" : "hidden",
        ])}
      >
        <div className="flex justify-between w-full">
          <p></p>
          <p className="font-bold text-slate-500">Ticket details</p>
          <AiFillCloseSquare className="cursor-pointer text-gray-400" onClick={() => setShowDetail(false)} />
        </div>
        <TicketCard ticket={detailTicket} className="bg-transparent -px-4" />
      </div>
    </div>
  );
}
