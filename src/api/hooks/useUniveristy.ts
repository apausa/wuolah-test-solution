import { QueryFunctionContext, useQuery } from "react-query";

import { fetcher } from "api/fetcher";
import { normalizeUniversity, UniversityAPI } from "model/University";

interface Params {
  slug: string;
}

interface Context extends Params {
  id: string;
}

export const fetchUniversity = async ({
  queryKey: [{ slug }],
}: QueryFunctionContext<Context[]>) => {
  const response: UniversityAPI = await fetcher(`/v2/universities/${slug}`);

  return normalizeUniversity(response);
};

export const useUniversity = ({ slug }: Params) =>
  useQuery({
    queryKey: [
      {
        id: "university",
        slug,
      } as Context,
    ],
    queryFn: fetchUniversity,
  });
