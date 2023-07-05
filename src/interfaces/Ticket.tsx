import { Movie } from "./Movie";
import { TicketTrans } from "./Transaction";

export interface Ticket {
  uid: string;
  time: string;
  date: Date;
  teater: string;
  count_ticket: number;
  orderId: string;
  qr_url: string;
  movie: Movie;
  transactionId?: string;
  seats: number[]
}
