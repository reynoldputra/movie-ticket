import { PrismaClient } from "@prisma/client"
import movieData from "./data/movies.json" assert { type : "json"}
import slugify from "slugify"
import { parse } from "path"
const prisma = new PrismaClient()

async function main () {
  for(let idx in movieData) {
    const movie = movieData[idx]
    const date = new Date(movie.release_date)
    const parsedTitle = movie.title.replace(/[^a-zA-Z\s]/g, "").toLowerCase();
    const slug = slugify(parsedTitle, "-")
    await prisma.movie.upsert({
      where : { slug : slug },
      update : {},
      create : {
        title : movie.title,
        slug : slug,
        release_date : date,
        description : movie.description,
        age_rating : movie.age_rating,
        price : movie.ticket_price,
        poster_url : movie.poster_url
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
