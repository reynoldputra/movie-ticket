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

const MovieCard : FunctionComponent<MovieCardProps> = (props) => {
  return (
    <div className="h-96 w-60 bg-white">
      <div className="w-60 h-72 relative">
        <Image src={props.poster} fill className="object-contain" alt="movie poster" />
      </div>
    </div>
  )
}

export default MovieCard

