import Cell from "@/components/layout/cell";
import { Item } from "@/interfaces/DropdownItems";
import DropdownInput from "@/components/form/DropdownInput";
import Modal from "@/components/Modal";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import SeatPicker from "./SeatPicker";
import GeneralForm from "@/components/form/GeneralForm";
import { TicketOrderInput } from "@/interfaces/FormInput";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import nextApi from "@/lib/client/api";
import clsxm from "@/lib/clsxm";
import { orderTicketPost } from "@/lib/client/orderTicketPost";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Time {
  time: Date;
  scheduleId: string;
}

interface ScheduleItem {
  name: string;
  address: string;
  times: Time[];
}

export default function BookingForm({ movieId }: { movieId: number }) {
  const [schedule, setSchedule] = useState<ScheduleItem[] | null>(null);
  const [cities, setCities] = useState<Item[] | null>(null);
  const [seats, setSeats] = useState<number[]>([]);
  const [selectSched, setSelectSched] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [city, setCity] = useState<Item | null>(null);
  const formMethod = useForm<TicketOrderInput>();

  const onClickSeatHandle = (seat: number) => {
    if (selectedSeats.includes(seat)) {
      let newSeats = selectedSeats.filter((seatState) => seatState != seat);
      setSelectedSeats(newSeats);
      formMethod.setValue("seats", newSeats);
    } else {
      if (selectedSeats.length < 6) {
        let newSeats = [...selectedSeats];
        newSeats.push(seat);
        setSelectedSeats(newSeats);
        formMethod.setValue("seats", newSeats);
      }
    }
  };

  const getCities = async () => {
    const result = await nextApi().get("/api/teater/city");
    const citiesData = result.data.data.map((c: string) => ({ value: c, tag: c }));
    setCity(citiesData[0]);
    setCities(citiesData);
  };

  const getSchedules = async (city: string) => {
    const result = await nextApi().get("/api/schedule", {
      params: {
        movieId: movieId.toString(),
        city: city,
        date: formMethod.getValues('date'),
      },
    });
    const theaters: unknown[] = result.data.data;
    const newSched: ScheduleItem[] = theaters.map((t: any) => {
      return {
        name: t.teater.name,
        address: t.teater.address,
        times: t.schedules.map((s: any) => {
            return {
              time: new Date(s.time),
              scheduleId: s.id,
            };
        }),
      };
    });
    console.log(newSched);
    newSched.map((s) => {
      s.times.sort((a, b) => b.time.getTime() - a.time.getTime());
    });
    setSchedule(newSched);
  };

  const getSeatsData = async (date: string, scheduleId: number) => {
    const result = await nextApi().get(`/api/seat/${scheduleId}`, {
      params: {
        date,
      },
    });
    console.log(result.data);
    setSeats(result.data.data);
    console.log(seats);
  };

  const scheduleClick = (schedId: number) => {
    setSelectSched(schedId);
    formMethod.setValue("scheduleId", schedId);
    getSeatsData(date.toLocaleDateString(), schedId);
  };

  useEffect(() => {
    if (city) getSchedules(city.value.toString());
  }, [city]);

  useEffect(() => {
    getCities();
    formMethod.setValue("date", new Date().toLocaleDateString());
  }, []);

  const router = useRouter()
  const onSubmit = formMethod.handleSubmit(async (data) => {
    console.log(data)
    if(!data.seats.length || !data.date || !data.scheduleId) {
      toast.error("Input not valid")
      return
    }
    const res = await orderTicketPost(data);
    console.log(res)
    if(res.status) router.push("/payment/" + res.data.id)
  });

  return (
    <Cell cols="1_full" className="flex justify-center py-32">
      <FormProvider {...formMethod}>
        <form onSubmit={onSubmit}>
          <GeneralForm className="" title="Booking now" submitLabel="Book">
            {cities && (
              <>
                <label className="font-bold">City</label>
                <DropdownInput items={cities} selected={city} setSelected={setCity} />
              </>
            )}
            <label className="font-bold">Date</label>
            <Modal title={date ? date.toDateString() : "Select a Date"}>
              <DayPicker
                mode="single"
                selected={date}
                fromDate={new Date()}
                toDate={new Date(new Date().getTime() + (10*24*60*60*1000))}
                onSelect={(v) => {
                  if (v) {
                    setDate(v);
                    formMethod.setValue("date", v.toString());
                    if (city) getSchedules(city?.value.toString());
                  }
                }}
              />
            </Modal>
            {schedule && (
              <div className="my-8 h-48 overflow-y-scroll flex flex-col gap-y-2">
                {schedule.map((s) => (
                  <>
                    <div className="py-2 border border-2 px-2">
                      <p className="font-bold text-sm">{s.name}</p>
                      <p className="text-xs text-slate-600">{s.address}</p>
                      <div className="text-sm w-full flex flex-wrap gap-y-1 gap-x-2 py-1">
                        {s.times.map((t) => (
                          <p
                            className={clsxm([
                              "border border-2 border-slate-200 bg-none rounded px-2 py-1 cursor-pointer",
                              selectSched == parseInt(t.scheduleId)
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "",
                            ])}
                            key={t.scheduleId}
                            onClick={() => scheduleClick(parseInt(t.scheduleId))}
                          >
                            {new Date(t.time).getHours()}:{new Date(t.time).getMinutes()}
                          </p>
                        ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
            {selectSched && (
              <>
                <label className="font-bold">Seat</label>
                <SeatPicker
                  onClickSeatHandle={onClickSeatHandle}
                  seats={selectedSeats}
                  booked={seats}
                />
              </>
            )}
          </GeneralForm>
        </form>
      </FormProvider>
    </Cell>
  );
}
