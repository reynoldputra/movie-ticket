import Cell from "@/components/layout/cell";
import { Item } from "@/interfaces/DropdownItems";
import DropdownInput from "@/components/form/DropdownInput";
import Modal from "@/components/Modal";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";
import SeatPicker from "./SeatPicker";
import GeneralForm from "@/components/form/GeneralForm";
export default function BookingForm() {
  const teaters: Item[] = [
    { id: 1, tag: "Pakuwon City Mall" },
    { id: 2, tag: "Pakuwon Trade Center" },
    { id: 3, tag: "City of Tomorrow" },
    { id: 4, tag: "Tujungan Plaza" },
    { id: 5, tag: "Galaxy Mall" },
  ];

  const times: Item[] = [
    { id: 1, tag: "08:00" },
    { id: 2, tag: "10:00" },
    { id: 3, tag: "12:00" },
    { id: 4, tag: "14:00" },
  ];

  return (
    <Cell cols="8_full" className="">
      <GeneralForm title="Booking now" submitLabel="Book">
        <label className="font-bold">Teater</label>
        <DropdownInput items={teaters} />
        <label className="font-bold">Date</label>
        <Modal title="Select a Date">
          <DayPicker mode="single" />
        </Modal>
        <label className="font-bold">Time</label>
        <DropdownInput items={times} />
        <label className="font-bold">Seat</label>
        <SeatPicker />
      </GeneralForm>
    </Cell>
  );
}
