import { useRouter } from "next/router";
import NextLink from "next/link";

import { useUniversity } from "api/hooks/useUniversity";

import { Heading, Link } from "@chakra-ui/react";

const University = () => {
  const { query } = useRouter();
  const universitySlug = query.universitySlug as string;
  const { data: university } = useUniversity({ slug: universitySlug });

  return (
    <>
      <NextLink href="/universidades" passHref>
        <Link>Ver todas</Link>
      </NextLink>
      <Heading as="h1" mt="4">
        {university?.name}
      </Heading>
    </>
  );
};

export default University;
