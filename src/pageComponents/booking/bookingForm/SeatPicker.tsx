import Modal from "@/components/Modal";
import clsxm from "@/lib/clsxm";
import { useState } from "react";

export default function SeatPicker() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const cols = [1, 2, 3, 4, 5, 6, 7, 8]
  const [seats, setSeats] = useState<string[]>([])

  const onClickSeatHandle = (seat: string) => {
    if (seats.includes(seat)) {
      let newSeats = seats.filter(seatState => seatState != seat)
      setSeats(newSeats)
    } else {
      let newSeats = [...seats]
      newSeats.push(seat)
      setSeats(newSeats)
    }
  }

  return (
    <Modal title="Choose a seats">
      <div className="px-12">
        <div className="flex gap-2 mb-2">
          <div className="w-8 h-8"></div>
          {
            cols.map((col, colIdx) => {
              return (
                <div key={colIdx} className="w-8 h-8 flex justify-center items-center">{col}</div>
              )
            })
          }
        </div>
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2 mb-2">
            <div className="w-8 h-8 flex justify-center items-center">{row}</div>
            {cols.map((col, colIdx) => (
              <div key={colIdx} className={clsxm(
                "w-8 h-8 bg-gray-200 flex justify-center transition-all items-center text-gray-500 text-xs",
                (seats.includes(row + col) && "bg-cyan-400 text-slate-600")
              )} onClick={() => onClickSeatHandle(row + col)}>
                {row + col}
              </div>
            ))}
            <div className="w-8 h-8"></div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
