import Grid from "@/components/layout/grid";
import BookingForm from "./bookingForm/BookingForm";
import MovieDetail from "./movieDetail/MovieDetail";
import { TMovie } from "@/interfaces/Movie";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Cell from "@/components/layout/cell";

export default function Booking({ movie }: { movie: TMovie }) {
  const { data: session } = useSession();

  return (
    <Grid className="pt-40">
      <MovieDetail movie={movie} />
      {session ? (
        <BookingForm movieId={movie.id} />
      ) : (
        <Cell cols="1_full" className="w-full flex justify-center">
          <Link href="/signin">
            <div className="w-48 px-4 py-2 bg-blue-600 text-white text-center rounded-md">Login to buy tickets</div>
          </Link>
        </Cell>
      )}
    </Grid>
  );
}
