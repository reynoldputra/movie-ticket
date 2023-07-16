import { Movie, Prisma, PrismaClient, Schedule, Teater } from "@prisma/client";
import movieData from "./data/movies.json" assert { type: "json" };
import teaterData from "./data/teater.json" assert { type: "json" };
import slugify from "slugify";
import { randomPicker, pickUniqueNumbers } from "../../lib/helper";
const prisma = new PrismaClient();

async function main() {
  // console.log("Seeding movies ... ")
  // for (let idx in movieData) {
  //   const movie = movieData[idx];
  //   const date = new Date(movie.release_date);
  //   const parsedTitle = movie.title.replace(/[^a-zA-Z\s]/g, "").toLowerCase();
  //   const slug = slugify(parsedTitle, "-");
  //   const newMovie: Prisma.MovieCreateInput = {
  //     title: movie.title,
  //     slug: slug,
  //     release_date: date,
  //     description: movie.description,
  //     age_rating: movie.age_rating,
  //     price: movie.ticket_price,
  //     poster_url: movie.poster_url,
  //   };
  //   await prisma.movie.upsert({
  //     where: { slug: slug },
  //     update: newMovie,
  //     create: newMovie,
  //   });
  // }

  // console.log("Seeding theaters ... ")
  // for (let idx in teaterData) {
  //   const teater = teaterData[idx];
  //   const newTeater: Teater = {
  //     id: teater.id,
  //     name: teater.name,
  //     city: teater.city,
  //     address: teater.address,
  //   };
  //   await prisma.teater.upsert({
  //     where: { id: teater.id },
  //     update: newTeater,
  //     create: newTeater,
  //   });
  // }
  //
  
  console.log("Seeding shecules ... ")
  let id = 1;
  for (let i in movieData) {
    const minutes = [15, 20, 30, 45, 55];
    for (let j in teaterData) {
      const currentDate = new Date();
      const end_day = randomPicker(-5, 20);
      const hours = pickUniqueNumbers(11, 22, 6);
      for (let h in hours) {
        let hour = hours[h];
        const minute = minutes[randomPicker(0, minutes.length - 1)];
        hour = hour < 10 ? 0 + hour : hour;
        let dateObj = new Date();
        dateObj.setUTCHours(hour, minute, 0, 0);
        let time = dateObj;
        const newSchedule = {
          id,
          teaterId: teaterData[j].id,
          movieId: movieData[i].id,
          time,
          start_date: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
          end_date: new Date(currentDate.getTime() + (end_day * 24 * 60 * 60 * 1000)), // dyanmic,
        };
        await prisma.schedule.upsert({
          where: { id : newSchedule.id },
          update: newSchedule,
          create: newSchedule,
        });
        console.log(id)
        id++;
      }
    }
  }
  // const movie = await prisma.movie.findMany()
  // for (let i in movie) {
  //   const minutes = [15, 20, 30, 45, 55];
  //   for (let j in teaterData) {
  //     const scheduleList : Prisma.ScheduleCreateManyInput[] = []
  //     const currentDate = new Date();
  //     const end_day = randomPicker(-5, 20);
  //     const hours = pickUniqueNumbers(11, 22, 3);
  //     for (let h in hours) {
  //       let hour = hours[h];
  //       const minute = minutes[randomPicker(0, minutes.length - 1)];
  //       hour = hour < 10 ? 0 + hour : hour;
  //       let dateObj = new Date();
  //       dateObj.setHours(hour);
  //       dateObj.setMinutes(minute)
  //       dateObj.setSeconds(0)
  //       dateObj.setMilliseconds(0)
  //       let time = dateObj;
  //       const newSchedule: Prisma.ScheduleCreateManyInput = {
  //         id,
  //         movieId: movie[i].id,
  //         teaterId: teaterData[j].id,
  //         start_date: new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  //         end_date: new Date(currentDate.getTime() + (end_day * 24 * 60 * 60 * 1000)), // dyanmic
  //         time,
  //       };
  //       console.log(id)
  //       scheduleList.push(newSchedule)
  //       id++;
  //     }
  //     await prisma.schedule.createMany({
  //       data : scheduleList
  //     });
  //   }
  // }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
