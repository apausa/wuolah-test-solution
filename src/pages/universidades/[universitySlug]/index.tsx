import { useRouter } from "next/router";

import { Heading } from "@chakra-ui/react";
import { useUniversity } from "api/hooks/useUniveristy";

const Page = () => {
  const { query } = useRouter();
  const universitySlug = query.universitySlug as string;
  const { data: university } = useUniversity({ slug: universitySlug });

  return (
    <div>
      <Heading as="h1">{university?.name}</Heading>
    </div>
  );
};

export default Page;
