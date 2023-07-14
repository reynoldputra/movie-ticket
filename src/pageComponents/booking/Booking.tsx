import Grid from "@/components/layout/grid";
import BookingForm from "./bookingForm/BookingForm";
import MovieDetail from "./movieDetail/MovieDetail";
import { TMovie } from "@/interfaces/Movie";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Cell from "@/components/layout/cell";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Movie } from "@prisma/client";
import nextApi from "@/lib/client/api";

export default function Booking() {
  const { data: session } = useSession();
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const { slug } = router.query;

  const getData = async () => {
    const response = await nextApi().get("/api/movie/m/" + slug);

    const m = response.data.data;
    const movie: Movie = {
      id: m.id,
      title: m.title,
      release_date: m.release_date,
      poster_url: m.poster_url,
      slug: m.slug,
      age_rating: m.age_rating,
      price: m.price,
      description: m.description,
    };
    setMovie(movie);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid className="pt-40">
      {movie && (
        <>
          <MovieDetail movie={movie} />
          {session ? (
            <BookingForm movieId={movie.id} />
          ) : (
            <Cell cols="1_full" className="w-full flex justify-center">
              <Link href="/signin">
                <div className="w-48 px-4 py-2 bg-blue-600 text-white text-center rounded-md">
                  Login to buy tickets
                </div>
              </Link>
            </Cell>
          )}
        </>
      )}
    </Grid>
  );
}
