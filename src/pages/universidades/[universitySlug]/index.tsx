import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";

import {
  fetchUniversity,
  universityKey,
  useUniversity,
} from "api/hooks/useUniversity";

import University from "containers/University";

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const universitySlug = params?.universitySlug as string;

  await queryClient.prefetchQuery(
    universityKey({ slug: universitySlug }),
    fetchUniversity
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 20,
  };
};

const Page = () => {
  const { query } = useRouter();
  const universitySlug = query.universitySlug as string;
  const { data: university } = useUniversity({ slug: universitySlug });

  return (
    <>
      <Head>
        <title>
          {university?.name} | Encuentra los apuntes de tus compañeros ahora
        </title>
      </Head>
      <University />
    </>
  );
};

export default Page;
