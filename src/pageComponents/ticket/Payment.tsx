import DropdownWithCtx from "@/components/form/DropdownWithCtx";
import GeneralForm from "@/components/form/GeneralForm";
import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import { Item } from "@/interfaces/DropdownItems";
import { Ticket } from "@/interfaces/Ticket";
import nextApi from "@/lib/client/api";
import { cancelOrderPost } from "@/lib/client/cancleOrderPost";
import { payOrderPost } from "@/lib/client/payOrderPost";
import { PaymentMethod } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ItemDetail {
  label: string;
  value: string | number;
}

export default function Payment() {
  const router = useRouter();
  const paymentid = router.query.paymentid;
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [ticketDetail, setTicketDetail] = useState<ItemDetail[] | null>(null);
  // const [payment, setPayment] = useState<TicketTrans | null>(null);

  const getPaymentDetail = async () => {
    try {
      const result = await nextApi().get("/api/pay/" + paymentid);
      const detail = result.data.data;

      const ticketDetail = detail.ticketDetail;
      const ticket: Ticket = {
        time: ticketDetail.time,
        date: ticketDetail.date,
        teater: ticketDetail.teater,
        count_ticket: ticketDetail.count_ticket,
        orderId: paymentid ? paymentid.toString() : "",
        qr_url: "",
        movie: ticketDetail.movie,
        seats: ticketDetail.seats,
      };

      setTicket(ticket);
      setTicketDetail([
        {
          label: "Movie name",
          value: ticket.movie.title,
        },
        {
          label: "Time",
          value: new Date(ticket.time).toLocaleTimeString(),
        },
        {
          label: "Date",
          value: new Date(ticket.date).toDateString(),
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
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(paymentid) getPaymentDetail();
  }, [paymentid]);

  const formMethod = useForm<{ method: string }>();

  const onSubmit = formMethod.handleSubmit( async (data) => {
    const res = await payOrderPost({
      paymentMethod : data.method,
      paymentId : paymentid ? paymentid.toString() : ""
    })
    if(res?.status) router.push("/ticket")
  });

  const paymentList: Item[] = [
    { value: "BCA", tag: PaymentMethod.BCA },
    { value: "QRIS", tag: PaymentMethod.QRIS },
  ];


  const cancelOrderHandler = async () => {
    const res= await cancelOrderPost(paymentid as string)
    if(res?.status) router.push("/ticket")

  }

  return (
    <Grid className="pt-40">
      <Cell cols="1_full" className="flex justify-center">
        <FormProvider {...formMethod}>
          <form onSubmit={onSubmit}>
            <GeneralForm title="Ticket Payment" submitLabel="Pay" className="px-6">
              <p className="text-black font-bold">Ticket Detail</p>
              <div className="grid text-sm grid-cols-8 gap-y-1">
                {ticketDetail &&
                  ticketDetail.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <p className="col-span-2">{item.label}</p>
                      <p className="col-span-1 text-center">:</p>
                      <p className="col-span-5">{item.value}</p>
                    </React.Fragment>
                  ))}
              </div>
              <div>
                <DropdownWithCtx items={paymentList} name="method" label="Payment Method" />
                {ticket && (
                  <p className="w-full text-xl font-bold text-center pt-6 pb-2 text-green-500">
                    IDR {ticket.count_ticket * ticket.movie.price}
                  </p>
                )}
              </div>
              <div className="cursor-pointer bg-red-600 text-white text-center font-bold py-1 mt-4" onClick={cancelOrderHandler}>Cancel order</div>
            </GeneralForm>
          </form>
        </FormProvider>
      </Cell>
    </Grid>
  );
}
