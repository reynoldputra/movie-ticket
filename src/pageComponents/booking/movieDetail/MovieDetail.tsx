import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import Image from "next/image"

export default function MovieDetail() {
  const movie = {
    "id": 0,
    "title": "Fast X",
    "description": "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
    "release_date": "2023-05-17",
    "poster_url": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    "age_rating": 15,
    "ticket_price": 53000
  }

  return (
    <Grid>
      <Cell cols="3_8" className="mt-28 flex justify-center items-center">
        <div className="w-64 aspect-[3/4] relative">
          <Image src={movie.poster_url} fill className="object-contain" alt="movie poster" />
        </div>
      </Cell>
      <Cell cols="5_4">
        <div className="w-full text-center text-sm">
          <p className="text-lg font-bold">{movie.title}</p>
          <div className="flex justify-center gap-3 text-slate-400">
            <p>Rp {movie.ticket_price}</p>
            <p>|</p>
            <p>{movie.age_rating} + </p>
          </div>
          <p className="mt-4">{movie.description}</p>
        </div>
      </Cell>
    </Grid>
  )
}
