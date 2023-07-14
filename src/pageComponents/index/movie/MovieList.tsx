import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import MovieCard from "@/components/movie/MovieCard";
import { TMovie } from "@/interfaces/Movie";

export default function MovieList({ movies }: { movies: TMovie[] }) {
  return (
    <section>
      <Grid className="py-20">
        <Cell cols="2_10">
          <p className="font-bold text-lg">Discover Movies</p>
        </Cell>
        <Cell cols="2_10">
          <div className="w-full flex justify-center">
            <div className="w-72 h-8 bg-slate-800 rounded-full"></div>
          </div>
        </Cell>
        <Cell cols="2_10" className="mt-12">
          <div className="w-full grid grid-cols-4 gap-x-8 gap-y-32">
            {movies.map((movie, idx) => {
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
