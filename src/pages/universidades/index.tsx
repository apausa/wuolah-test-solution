import { useMemo } from "react";
import NextLink from "next/link";

import { useInfiniteUniversities } from "api/hooks/useUniversities";

import { Heading, Stack, Link } from "@chakra-ui/react";

const Page = () => {
  const { data } = useInfiniteUniversities({});

  const flatUniversities = useMemo(
    () =>
      data
        ? data.pages.flatMap(({ data }) => data.map((university) => university))
        : [],
    [data]
  );

  return (
    <div>
      <Heading as="h1">Universidades</Heading>
      <Stack>
        {flatUniversities.map((university) => (
          <NextLink
            key={university.id}
            href={`/universidades/${university.slug}`}
          >
            <Link>{university.name}</Link>
          </NextLink>
        ))}
      </Stack>
    </div>
  );
};

export default Page;
