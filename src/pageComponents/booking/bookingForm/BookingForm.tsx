import Grid from "@/components/layout/grid";
import Cell from "@/components/layout/cell";
import DateInput from "./DateInput";
import { Item } from "@/interfaces/DropdownItems"
import DropdownInput from "@/components/form/DropdownInput";

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
    <Grid>
      <Cell cols="1_full" className="flex justify-center">
        <p className="text-xl font-bold">Grab Your Tickets</p>
      </Cell>
      <Cell cols="2_10" className="pt-10">
        <div>
          <label className="font-bold">Teater</label>
          <DropdownInput items={teaters} />
        </div>
        <div className="mt-8">
          <label className="font-bold">Date</label>
          <DateInput />
        </div>
        <div className="mt-8">
          <label className="font-bold">Time</label>
          <DropdownInput items={times} />
        </div>
      </Cell>
    </Grid>
  )
}
