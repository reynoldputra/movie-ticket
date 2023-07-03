import Grid from "@/components/layout/grid";
import BookingForm from "./bookingForm/BookingForm";
import MovieDetail from "./movieDetail/MovieDetail";

export default function Booking() {
  return (
    <Grid className="pt-40">
      <MovieDetail />
      <BookingForm />
    </Grid>
  )
}
