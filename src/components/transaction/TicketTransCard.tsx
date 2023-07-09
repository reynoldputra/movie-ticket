import { Ticket } from "@/interfaces/Ticket";
import { TicketTrans } from "@/interfaces/Transaction";
import clsxm from "@/lib/clsxm";
import { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import TicketCard from "../ticket/TicketCard";

interface TicketTransCardProps {
  transaction: TicketTrans;
}

export default function TicketTransCard({ transaction }: TicketTransCardProps) {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const detailTicket: Ticket = {
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
  };

  return (
    <div className="bg-white rounded flex flex-col w-full text-black py-2 px-4">
      <div className="cursor-pointer" onClick={() => setShowDetail(true)}>
        <div className="w-full flex justify-between text-sm text-slate-500">
          <p>Valid until : </p>
          <p>#{transaction.uid}</p>
        </div>
        <div className="w-full flex justify-between text-lg font-bold">
          <p>{transaction.validDate.toDateString()}</p>
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
      </div>
    </div>
  );
}