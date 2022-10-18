import { useMemo } from "react";
import NextLink from "next/link";
import { Virtuoso } from "react-virtuoso";

import { useInfiniteUniversities } from "api/hooks/useUniversities";

import {
  Box,
  Center,
  Container,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

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
        style={{ flex: 1 }}
        data={items}
        useWindowScroll
        endReached={() => fetchNextPage()}
        overscan={40}
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
          List: Stack,
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
