import { FunctionComponent } from "react";
import Image from "next/image";
import { TMovie } from "@/interfaces/Movie";
import Link from "next/link";

interface MovieCardProps {
  movie: TMovie;
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={"/movie/" + movie.slug}>
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
            <p>{new Date(movie.release_date).getFullYear()}</p>
            <p>|</p>
            <p>Rp {movie.price.toString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
