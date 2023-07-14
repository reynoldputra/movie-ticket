import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import MovieCard from "@/components/movie/MovieCard";
import { TMovie } from "@/interfaces/Movie";
import nextApi from "@/lib/client/api";
import { useEffect, useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState<TMovie[] | null>(null);
  const getData = async () => {
    const res = await nextApi().get("/api/movie");
    const movies: TMovie[] = res.data.data.map((m: any): TMovie => {
      return {
        id: m.id,
        title: m.title,
        release_date: m.release_date,
        poster_url: m.poster_url,
        slug: m.slug,
        age_rating: m.age_rating,
        price: m.price,
        description: m.description,
      };
    });

    setMovies(movies);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section>
      <Grid className="py-20">
        <Cell cols="1_full" colsMd="2_10">
          <p className="font-bold text-lg">Discover Movies</p>
        </Cell>
        <Cell cols="1_full" colsMd="2_10">
          <div className="w-full flex justify-center">
            <div className="w-72 h-8 bg-slate-800 rounded-full"></div>
          </div>
        </Cell>
        <Cell cols="1_full" colsMd="2_10" className="mt-12">
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-32">
            {movies && movies.map((movie, idx) => {
              return (
                <div className="w-full flex justify-center" key={idx}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
        </Cell>
      </Grid>
    </section>
  );
}
