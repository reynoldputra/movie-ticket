import Cell from "@/components/layout/cell";
import { TMovie } from "@/interfaces/Movie";
import Image from "next/image"

export default function MovieDetail({movie} : {movie : TMovie}) {
  return (
    <Cell cols="1_full" className="flex flex-col items-center">
      <div className="w-64 aspect-[3/4] relative">
        <Image src={movie.poster_url} fill className="object-contain" alt="movie poster" />
      </div>
      <div className="w-full text-center text-sm max-w-sm">
        <p className="text-lg font-bold">{movie.title}</p>
        <div className="flex justify-center gap-3 text-slate-400">
          <p>Rp {movie.price}</p>
          <p>|</p>
          <p>{movie.age_rating} + </p>
        </div>
        <p className="mt-4">{movie.description}</p>
      </div>
    </Cell>
  )
}
