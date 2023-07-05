import Cell from "@/components/layout/cell";
import { Movie } from "@/interfaces/Movie";
import Image from "next/image"

export default function MovieDetail() {
  const movie : Movie = {
    "id": 0,
    "title": "Fast X",
    "description": "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
    "release_date": new Date("2023-05-17"),
    "poster_url": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    "age_rating": 15,
    "price": 53000
  }

  return (
    <Cell cols="1_6" className="flex flex-col items-center">
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
