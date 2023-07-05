import GeneralForm from "@/components/form/GeneralForm";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import { Ticket } from "@/interfaces/Ticket";
import { TicketTrans } from "@/interfaces/Transaction";

export default function Payment() {
  const ticket: Ticket = {
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
    seats : [1, 2, 3],
    transactionId : "adfas1231"
  };

  const transaction: TicketTrans = {
    uid: "adfas1231",
    cash: 123000,
    validDate: new Date("3-5-2023"),
    paymentMethod: "BCA"
  };

  const ticketDetail = [
    {
      label: "Movie name",
      value: ticket.movie.title,
    },
    {
      label: "Date",
      value: ticket.date.toDateString(),
    },
    {
      label: "Tickets",
      value: ticket.count_ticket,
    },
    {
      label: "Teater",
      value: ticket.teater,
    },
    {
      label: "Seats",
      value: ticket.seats.join(", "),
    },
    {
      label: "Payment method",
      value: transaction.paymentMethod,
    }
  ];

  return (
    <Grid className="pt-40">
      <Cell cols="1_full" className="flex justify-center">
        <GeneralForm title="Ticket Payment" submitLabel="Pay" className="w-[500px] px-16">
          <p className="text-black font-bold">Ticket Detail</p>
          <div className="grid grid-cols-8 gap-y-1">
            {ticketDetail.map((item) => (
              <>
                <p className="col-span-2">{item.label}</p>
                <p className="col-span-1 text-center">:</p>
                <p className="col-span-5">{item.value}</p>
              </>
            ))}
          </div>
          <p className="w-full text-xl font-bold text-center py-6 text-green-500">IDR {ticket.count_ticket * ticket.movie.price}</p>
        </GeneralForm>
      </Cell>
    </Grid>
  );
}
