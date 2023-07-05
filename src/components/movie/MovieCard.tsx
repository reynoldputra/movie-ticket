import { FunctionComponent } from "react";
import Image from "next/image";
import { Movie } from "@/interfaces/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ movie }) => {
  return (
    <div className="w-48">
      <div className="w-48 aspect-[3/4.5] relative">
        <Image src={movie.poster_url} fill className="object-contain" alt="movie poster" />
      </div>
      <div className="mt-4 text-sm">
        <div className="w-full flex justify-between gap-4">
          <p className="font-bold">{movie.title}</p>
          <p className="font-bold text-cyan-300">{movie.age_rating}+</p>
        </div>
        <div className="w-full flex gap-2 text-slate-400 text-xs mt-3">
          <p>{movie.release_date.getFullYear()}</p>
          <p>|</p>
          <p>Rp {movie.price.toString()}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
