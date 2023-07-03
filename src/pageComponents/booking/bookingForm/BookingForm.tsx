import Cell from "@/components/layout/cell";
import { Item } from "@/interfaces/DropdownItems"
import DropdownInput from "@/components/form/DropdownInput";
import Modal from "@/components/Modal";
import { DayPicker } from "react-day-picker";

import 'react-day-picker/dist/style.css';
import SeatPicker from "./SeatPicker";
export default function BookingForm() {
  const teaters: Item[] = [
    { id: 1, tag: 'Pakuwon City Mall' },
    { id: 2, tag: 'Pakuwon Trade Center' },
    { id: 3, tag: 'City of Tomorrow' },
    { id: 4, tag: 'Tujungan Plaza' },
    { id: 5, tag: 'Galaxy Mall' }
  ]

  const times: Item[] = [
    { id: 1, tag: '08:00' },
    { id: 2, tag: '10:00' },
    { id: 3, tag: '12:00' },
    { id: 4, tag: '14:00' }
  ]

  return (
    <Cell cols="8_full" className="">
      <p className="text-2xl font-bold mb-8">Grab Your Tickets</p>
      <div>
        <label className="font-bold">Teater</label>
        <DropdownInput items={teaters} />
      </div>
      <div className="mt-6">
        <label className="font-bold">Date</label>
        <Modal title="Select a Date">
          <DayPicker mode="single" />
        </Modal>
      </div>
      <div className="mt-6">
        <label className="font-bold">Time</label>
        <DropdownInput items={times} />
      </div>
      <div className="mt-6">
        <label className="font-bold">Seat</label>
        <SeatPicker />
      </div>
      <div className="py-2 px-6 w-fit h-fit mt-8 bg-cyan-500 font-bold rounded-md">
        Buy
      </div>
    </Cell>
  )
}
