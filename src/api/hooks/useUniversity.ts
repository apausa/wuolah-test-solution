import { QueryFunctionContext, useQuery } from "react-query";

import { fetcher } from "api/fetcher";
import { normalizeUniversity, UniversityAPI } from "model/University";

interface Params {
  slug: string;
}

export const universityKey = (params: Params) =>
  [
    {
      id: "universities",
      ...params,
    },
  ] as const;

export const fetchUniversity = async ({
  queryKey: [{ slug }],
}: QueryFunctionContext<ReturnType<typeof universityKey>>) => {
  const response: UniversityAPI = await fetcher(`/v2/universities/${slug}`);

  return normalizeUniversity(response);
};

export const useUniversity = ({ slug }: Params) =>
  useQuery({
    queryKey: universityKey({ slug }),
    queryFn: fetchUniversity,
  });
