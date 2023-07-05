import { TransHistory } from "@/interfaces/Transaction";

interface HistoryTransCardProps {
  transaction: TransHistory;
}

export default function HistoryTransCard({ transaction }: HistoryTransCardProps) {
  return (
    <div className="bg-white rounded flex flex-col w-full text-black py-2 px-4">
      <div className="w-full flex justify-between text-lg font-bold">
        <div className="flex gap-2">
          <p>{transaction.type}</p>
          | 
          <p className={transaction.status.color}>{transaction.status.tag}</p>
        </div>
        <p className={transaction.status.color}>{transaction.cash}</p>
      </div>
      <div className="w-full flex justify-between text-sm text-slate-500">
        <p>{transaction.date.toDateString()}</p>
        <p>#{transaction.uid}</p>
      </div>
      <div className="h-24 bg-blue-50 rounded my-2 hidden">
        
      </div>
    </div>
  );
}
