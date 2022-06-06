import { useRouter } from "next/router";

const Page = () => {
  const { query } = useRouter();

  return <div>Universidad {query.universitySlug}</div>;
};

export default Page;
