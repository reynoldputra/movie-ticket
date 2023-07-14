import Modal from "@/components/Modal";
import clsxm from "@/lib/clsxm";
import { ReactNode } from "react";

export default function SeatPicker({onClickSeatHandle, seats, booked}  : {onClickSeatHandle : (seat : number) => void, seats : number[], booked : number[]}) {
  const seatsDiv: ReactNode[] = [];

  for (let i = 0; i <= 7; i++) {
    const row: ReactNode[] = [];
    for (let j = 1; j <= 8; j++) {
      let idx = i * 8 + j;
      row.push(
        <div
          className={clsxm(
            "w-8 h-8 bg-gray-200 flex justify-center transition-all items-center text-gray-500 text-xs cursor-pointer",
            seats.includes(idx) && "bg-blue-600 text-white",
            booked.includes(idx) && "bg-red-300 cursor-not-allowed text-white"
          )}
          onClick={() => {if(!booked.includes(idx)) onClickSeatHandle(idx)}}
        >
          {idx}
        </div>
      );
    }
    seatsDiv.push(<div className="flex gap-2 mb-2">{row}</div>);
  }

  return (
    <Modal title="Choose a seats">
      <div>
        <div className="px-12 py-4">{seatsDiv}</div>
        <div className="text-sm font-bold text-slate-600 w-full text-center bg-blue-100 py-1 my-2">Screen</div>
      </div>
    </Modal>
  );
}
