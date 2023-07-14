import Grid from "@/components/layout/grid";
import BookingForm from "./bookingForm/BookingForm";
import MovieDetail from "./movieDetail/MovieDetail";
import { TMovie } from "@/interfaces/Movie";

export default function Booking({movie} : {movie : TMovie}) {
  return (
    <Grid className="pt-40">
      <MovieDetail movie={movie} />
      <BookingForm movieId={movie.id} />
    </Grid>
  )
}
