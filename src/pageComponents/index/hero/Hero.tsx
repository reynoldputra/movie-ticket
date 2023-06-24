import { useState } from "react"
import Image from "next/image"
import { cursorTo } from "readline"

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
      <div className="w-[600px] text-center relative z-10">
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat obcaecati cum sapiente, quo quae exercitationem iure sunt eaque, commodi nemo, at debitis inventore amet veniam nesciunt! Atque ducimus reprehenderit autem</p>
        <p className="text-lg font-bold mt-4">Title</p>
      </div>
      <div className="h-screen w-screen absolute z-0 brightness-50 opacity-20">
        <Image src={movies[currentMovie].poster_url} fill className="object-cover" alt="movie poster" />
      </div>
      <div className="">

      </div>
    </section>
  )
}
