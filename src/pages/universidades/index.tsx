import { GetStaticProps } from "next";
import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";

import { fetchUniversities, universitiesKey } from "api/hooks/useUniversities";

import Univeristies from "containers/Universities";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    universitiesKey({}),
    fetchUniversities
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 20,
  };
};

const Page = () => {
  return (
    <>
      <Head>
        <title>
          Listado de Universidades | Encuentra los apuntes de tus compañeros
          ahora
        </title>
      </Head>
      <Univeristies />
    </>
  );
};

export default Page;
