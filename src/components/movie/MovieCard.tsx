import { FunctionComponent } from "react"
import Image from "next/image"

interface MovieCardProps {
  id: number
  title: string
  release_date: Date
  poster: string
  age: Number
  price: Number
}

const MovieCard: FunctionComponent<MovieCardProps> = (props) => {
  return (
    <div className="w-48">
      <div className="w-48 aspect-[3/4.5] relative">
        <Image src={props.poster} fill className="object-contain" alt="movie poster" />
      </div>
      <div className="mt-4 text-sm">
        <div className="w-full flex justify-between gap-4">
          <p className="font-bold">{props.title}</p>
          <p className="font-bold text-cyan-300">{props.age.toString()}+</p>
        </div>
        <div className="w-full flex gap-2 text-slate-400 text-xs mt-3">
          <p>{props.release_date.toLocaleDateString()}</p>
          <p>|</p>
          <p>Rp {props.price.toString()}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

