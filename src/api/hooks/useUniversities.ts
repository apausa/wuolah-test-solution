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

const defaultParams = (params: Params) => ({
  pagination: {
    page: params.pagination?.page || 0,
    pageSize: params.pagination?.pageSize || 20,
    withCount: params.pagination?.withCount || true,
  },
});

export const universitiesKey = (params: Params) =>
  [
    {
      id: "universities",
      ...defaultParams(params),
    },
  ] as const;

export const fetchUniversities = async ({
  queryKey: [{ pagination }],
  pageParam,
}: QueryFunctionContext<ReturnType<typeof universitiesKey>>) => {
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

export const useInfiniteUniversities = (params: Params) =>
  useInfiniteQuery({
    queryKey: universitiesKey(params),
    queryFn: fetchUniversities,
    getNextPageParam,
  });
