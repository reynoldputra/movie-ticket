import { useState } from "react"
import Image from "next/image"
import Grid from "@/components/layout/grid"
import Cell from "@/components/layout/cell"

export default function Hero() {
  const [currentMovie, setcurrentMovie] = useState(0)
  const movies = [
    {
      "id": 0,
      "title": "Fast X",
      "description": "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
      "release_date": "2023-05-17",
      "poster_url": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      "age_rating": 15,
      "ticket_price": 53000
    },
    {
      "id": 1,
      "title": "John Wick: Chapter 4",
      "description": "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
      "release_date": "2023-03-22",
      "poster_url": "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      "age_rating": 10,
      "ticket_price": 60000
    },
    {
      "id": 2,
      "title": "The Super Mario Bros. Movie",
      "description": "Ketika sedang bekerja di bawah tanah untuk memperbaiki pipa air, Mario dan Luigi, yang merupakan tukang ledeng dari Brooklyn, tiba-tiba terhisap ke dalam pipa misterius dan masuk ke dunia yang sangat berbeda. Mereka berada di tempat yang ajaib dan aneh. Tapi sayangnya, mereka terpisah satu sama lain. Mario memulai petualangan besar untuk mencari dan menemukan Luigi.",
      "release_date": "2023-04-05",
      "poster_url": "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      "age_rating": 14,
      "ticket_price": 49000
    }
  ]

  return (
    <section className="w-full min-h-screen flex justify-center items-center relative">
      <Grid screenHeight={false} className="w-full">
        <Cell cols="1_full" className="relative z-10 flex justify-center">
          <div className="w-[400px] text-center">
            <p className="text-sm text-slate-200">{movies[currentMovie].description}</p>
            <p className="text-lg font-bold mt-4">{movies[currentMovie].title}</p>
          </div>
        </Cell>
      </Grid>
      <div className="h-screen w-screen absolute z-0 brightness-50 opacity-20">
        <Image src={movies[currentMovie].poster_url} fill className="object-cover" alt="movie poster" />
      </div>
      {/* <div className="absolute bottom-6 flex h-40 translate-x-1/3"> */}
      {/*   { */}
      {/*     movies.map((movie, idx: number) => { */}
      {/*       return ( */}
      {/*         <div className="w-36 h-40 relative" key={idx}> */}
      {/*           <Image src={movie.poster_url} fill className="object-contain" alt="movie poster" /> */}
      {/*         </div> */}
      {/*       ) */}
      {/*     }) */}
      {/*   } */}
      {/* </div> */}
      <div className="w-full h-32 bg-gradient-to-t from-slate-900 absolute bottom-0"></div>
    </section>
  )
}
