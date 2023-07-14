import { TMovie } from "./Movie";

export interface Ticket {
  uid?: string;
  time: string;
  date: Date;
  teater: string;
  count_ticket: number;
  orderId: string;
  qr_url: string;
  movie: TMovie;
  transactionId?: string;
  seats: number[]
}
