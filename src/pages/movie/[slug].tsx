import Layout from "@/components/Layout";
import { TMovie } from "@/interfaces/Movie";
import nextApi from "@/lib/client/api";
import Booking from "@/pageComponents/booking/Booking";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

export default function BookingPage({movie} : {movie : TMovie}) {
  return (
    <Layout>
      <Booking movie={movie} />
    </Layout>
  );
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await nextApi().get("/api/movie/slug");
  const slugs = result.data.data;

  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("ctx", context);
  const { slug } = context.params as IParams;
  const response = await nextApi().get("/api/movie/m/" + slug);

  const m = response.data.data
  const movie : TMovie = {
    id: m.id,
    title: m.title,
    release_date: m.release_date,
    poster_url: m.poster_url,
    slug: m.slug,
    age_rating: m.age_rating,
    price: m.price,
    description: m.description,
  }

  return {
    props: {
      movie
    },
  };
};
