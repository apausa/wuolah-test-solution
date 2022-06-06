import { useRouter } from "next/router";

import { Heading } from "@chakra-ui/react";

const Page = () => {
  const { query } = useRouter();

  return (
    <div>
      <Heading as="h1">Universidad {query.universitySlug}</Heading>
    </div>
  );
};

export default Page;
