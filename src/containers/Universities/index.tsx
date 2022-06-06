import { useMemo } from "react";
import NextLink from "next/link";
import { Virtuoso } from "react-virtuoso";

import { useInfiniteUniversities } from "api/hooks/useUniversities";

import { Heading, Link, Spinner, Text } from "@chakra-ui/react";

const Univeristies = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteUniversities({});

  const items = useMemo(
    () =>
      data
        ? data.pages.flatMap(({ data }) => data.map((university) => university))
        : [],
    [data]
  );

  return (
    <>
      <Heading as="h1">Universidades</Heading>
      <Virtuoso
        data={items}
        useWindowScroll
        endReached={() => fetchNextPage()}
        overscan={20}
        itemContent={(index, university) => {
          return (
            <NextLink
              key={university.id}
              href={`/universidades/${university.slug}`}
            >
              <Link>{university.name}</Link>
            </NextLink>
          );
        }}
        components={{
          Footer: () => {
            if (!hasNextPage) return <Text>No hay más resultados</Text>;
            if (isFetchingNextPage) return <Spinner />;
            return null;
          },
        }}
      />
    </>
  );
};

export default Univeristies;
