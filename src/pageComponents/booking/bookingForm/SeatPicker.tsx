import Modal from "@/components/Modal";
import clsxm from "@/lib/clsxm";
import { ReactNode, useState } from "react";

export default function SeatPicker() {
  const [seats, setSeats] = useState<number[]>([]);

  const onClickSeatHandle = (seat: number) => {
    if (seats.includes(seat)) {
      let newSeats = seats.filter((seatState) => seatState != seat);
      setSeats(newSeats);
    } else {
      let newSeats = [...seats];
      newSeats.push(seat);
      setSeats(newSeats);
    }
  };

  const seatsDiv: ReactNode[] = [];

  for (let i = 0; i <= 7; i++) {
    const row: ReactNode[] = [];
    for (let j = 1; j <= 8; j++) {
      let idx = i * 8 + j;
      row.push(
        <div
          className={clsxm(
            "w-8 h-8 bg-gray-200 flex justify-center transition-all items-center text-gray-500 text-xs",
            seats.includes(idx) && "bg-cyan-400 text-slate-600"
          )}
          onClick={() => onClickSeatHandle(idx)}
        >
          {idx}
        </div>
      );
    }
    seatsDiv.push(<div className="flex gap-2 mb-2">{row}</div>);
  }

  return (
    <Modal title="Choose a seats">
      <div className="px-12">{seatsDiv}</div>
    </Modal>
  );
}
