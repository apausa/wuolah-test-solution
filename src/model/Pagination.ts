export interface Pagination {
  pageSize?: number;
  page?: number;
  withCount?: boolean;
}

export interface PaginatedResponse<T> {
  data: T;
  meta: {
    pagination: MetaPagination;
  };
}

export interface MetaPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total?: number;
}

export const getNextPageParam = (lastPage: PaginatedResponse<unknown>) => {
  const {
    meta: {
      pagination: { page, pageCount, pageSize, total },
    },
  } = lastPage;
  const hasMorePages =
    total !== undefined
      ? // cuando tenemos el total de elementos
        // podemos saber a ciencia cierta si hay más páginas en todos los casos de uso
        page * pageSize + pageCount < total
      : // si no tenemos el total hay un edge case dónde puede hacer una llamada extra
        // ej: hay 40 elementos y pedimos 10 por página
        //     la última página devolverá pageCount = 10 y pageSize = 10
        //     pero sin el total no podemos saber si hay más páginas
        pageCount < pageSize;

  return hasMorePages ? page + 1 : undefined;
};
