import Cell from "@/components/layout/cell";
import Grid from "@/components/layout/grid";
import MovieCard from "@/components/movie/MovieCard";
import { Movie } from "@/interfaces/Movie";

export default function MovieList() {
  const movies : Movie[] = [
    {
      "id": 0,
      "title": "Fast X",
      "description": "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
      "release_date": new Date("2023-05-17"),
      "poster_url": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      "age_rating": 15,
      "price": 53000
    },
    {
      "id": 1,
      "title": "John Wick: Chapter 4",
      "description": "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
      "release_date": new Date("2023-03-22"),
      "poster_url": "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      "age_rating": 10,
      "price": 60000
    },
    {
      "id": 2,
      "title": "The Super Mario Bros. Movie",
      "description": "Ketika sedang bekerja di bawah tanah untuk memperbaiki pipa air, Mario dan Luigi, yang merupakan tukang ledeng dari Brooklyn, tiba-tiba terhisap ke dalam pipa misterius dan masuk ke dunia yang sangat berbeda. Mereka berada di tempat yang ajaib dan aneh. Tapi sayangnya, mereka terpisah satu sama lain. Mario memulai petualangan besar untuk mencari dan menemukan Luigi.",
      "release_date": new Date("2023-04-05"),
      "poster_url": "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      "age_rating": 14,
      "price": 49000
    },
    {
      "id": 0,
      "title": "Fast X",
      "description": "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
      "release_date": new Date("2023-05-17"),
      "poster_url": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      "age_rating": 15,
      "price": 53000
    },
    {
      "id": 1,
      "title": "John Wick: Chapter 4",
      "description": "ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.",
      "release_date": new Date("2023-03-22"),
      "poster_url": "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      "age_rating": 10,
      "price": 60000
    },
    {
      "id": 2,
      "title": "The Super Mario Bros. Movie",
      "description": "Ketika sedang bekerja di bawah tanah untuk memperbaiki pipa air, Mario dan Luigi, yang merupakan tukang ledeng dari Brooklyn, tiba-tiba terhisap ke dalam pipa misterius dan masuk ke dunia yang sangat berbeda. Mereka berada di tempat yang ajaib dan aneh. Tapi sayangnya, mereka terpisah satu sama lain. Mario memulai petualangan besar untuk mencari dan menemukan Luigi.",
      "release_date": new Date("2023-04-05"),
      "poster_url": "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      "age_rating": 14,
      "price": 49000
    }
  ]

  return (
    <section>
      <Grid className="py-20">
        <Cell cols="2_10">
          <p className="font-bold text-lg">Discover Movies</p>
        </Cell>
        <Cell cols="2_10">
          <div className="w-full flex justify-center">
            <div className="w-72 h-8 bg-slate-800 rounded-full"></div>
          </div>
        </Cell>
        <Cell cols="2_10" className="mt-12">
          <div className="w-full grid grid-cols-4 gap-x-8 gap-y-32">
            {
              movies.map((movie, idx) => {
                return (
                  <div className="w-full flex justify-center" key={idx}>
                    <MovieCard
                      movie={movie}
                    />
                  </div>
                )
              })
            }
          </div>
        </Cell>
      </Grid>
    </section>
  )
}
