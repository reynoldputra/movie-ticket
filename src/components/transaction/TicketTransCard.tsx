import { Ticket } from "@/interfaces/Ticket";
import { TicketTrans } from "@/interfaces/Transaction";
import clsxm from "@/lib/clsxm";
import { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import TicketCard from "../ticket/TicketCard";
import { transcode } from "buffer";
import nextApi from "@/lib/client/api";

interface TicketTransCardProps {
  transaction: TicketTrans;
}

export default function TicketTransCard({ transaction }: TicketTransCardProps) {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [detailTicket, setDetailTicket] = useState<Ticket | null>(null);

  const getMovie = async () => {
    console.log(transaction.uid);
    const result = await nextApi().get("/api/ticket/p/" + transaction.uid);
    setDetailTicket(result.data.data);
    setShowDetail(true);
  };
  return (
    <div className="bg-white rounded flex flex-col w-full text-black py-2 px-4">
      <div className="cursor-pointer" onClick={() => getMovie()}>
        <div className="w-full flex justify-between text-sm text-slate-500">
          <p>Valid until : </p>
          <p>#{transaction.uid}</p>
        </div>
        <div className="w-full flex justify-between text-lg font-bold">
          <p>{new Date(transaction.validDate).toLocaleTimeString()} | {new Date(transaction.validDate).toDateString()}</p>
          <p>IDR {transaction.cash}</p>
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
