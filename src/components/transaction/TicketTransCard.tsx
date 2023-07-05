import { TicketTrans } from "@/interfaces/Transaction";

interface TicketTransCardProps {
  transaction: TicketTrans;
}

export default function TicketTransCard({ transaction }: TicketTransCardProps) {
  return (
    <div className="bg-white rounded flex flex-col w-full text-black py-2 px-4">
      <div className="w-full flex justify-between text-sm text-slate-500">
        <p>Valid until : </p>
        <p>#{transaction.uid}</p>
      </div>
      <div className="w-full flex justify-between text-lg font-bold">
        <p>{transaction.validDate.toDateString()}</p>
        <p>IDR {transaction.cash}</p>
      </div>
      <div className="h-24 bg-blue-50 rounded my-2 hidden">
        
      </div>
    </div>
  );
}
