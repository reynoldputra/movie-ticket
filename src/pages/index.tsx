import Layout from "@/components/Layout";
import { TMovie } from "@/interfaces/Movie";
import nextApi from "@/lib/client/api";
import Index from "@/pageComponents/index/Index";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{ movies: TMovie[] }> = async () => {
  const res = await nextApi().get("/api/movie");
  const movies: TMovie[] = res.data.data.map((m: any): TMovie => {
    return {
      id: m.id,
      title: m.title,
      release_date: m.release_date,
      poster_url: m.poster_url,
      slug: m.slug,
      age_rating: m.age_rating,
      price: m.price,
      description: m.description,
    };
  });
  return {
    props: {
      movies,
    },
  };
};

export default function Home({ movies }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Index movies={movies} />
    </Layout>
  );
}
