import { QueryFunctionContext, useInfiniteQuery } from "react-query";

import { fetcher } from "api/fetcher";
import { stringify } from "utils/stringify";
import { normalizeUniversity, UniversityAPI } from "model/University";
import {
  getNextPageParam,
  PaginatedResponse,
  Pagination,
} from "model/Pagination";

interface Params {
  pagination?: Pagination;
}

interface Context extends Params {
  id: string;
}

export const fetchUniversities = async ({
  queryKey: [{ pagination }],
  pageParam,
}: QueryFunctionContext<Context[]>) => {
  const query = stringify({
    pagination: {
      ...pagination,
      page: pageParam || pagination?.page,
    },
  });

  const response: PaginatedResponse<UniversityAPI[]> = await fetcher(
    `/v2/universities${query}`
  );

  return {
    ...response,
    data: response.data.map(normalizeUniversity),
  };
};

export const useInfiniteUniversities = ({ pagination }: Params) =>
  useInfiniteQuery({
    queryKey: [
      {
        id: "universities",
        pagination: {
          page: pagination?.page || 0,
          pageSize: pagination?.pageSize || 20,
          withCount: pagination?.withCount || true,
        },
      } as Context,
    ],
    queryFn: fetchUniversities,
    getNextPageParam,
  });
