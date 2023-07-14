import { TMovie } from "@/interfaces/Movie";
import Hero from "./hero/Hero";
import MovieList from "./movie/MovieList";

export default function Index() {
  return (
    <>
      <Hero />
      <MovieList />
    </>
  )
}
