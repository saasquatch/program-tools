import { useQuery } from '@saasquatch/component-boilerplate';
import { usePagination } from './usePagination';

export type PageVars = {
  offset: number;
  limit: number;
};

/**
 * dataPath and countPath MUST use the question mark operator when accessing
 * fields. If it doesn't then it will violate a Rule of Hooks
 */
export function usePaginatedCountQuery<TData, TVars extends { [key: string]: any } = {}>(
  query: unknown,
  countQuery: unknown,
  countPath: (data: any) => number,
  dataPath: (data: any) => TData[],
  pageVars: PageVars,
  extraVars: TVars = {} as TVars,
) {
  const { limit, offset, setLimit, setCurrentPage, calculatePagination } = usePagination(pageVars);

  // we never want data going stale
  const variables = { limit, offset, ...extraVars };

  const { loading, errors, data, refetch } = useQuery(query as any, variables);

  const countVariables = extraVars // countQuery should have hardcoded pagination

  const { loading: loadingCount, errors: errorsCount, data: dataCount, refetch: refetchCount } = useQuery(countQuery as any, countVariables);

  // this value needs to be accessed using the ? operator
  // react throws a hook error otherwise
  const queryData = dataPath(data);
  const count = countPath(data);
  const totalCount = countPath(dataCount);

  const { currentPage, pageCount, pageProgress } = calculatePagination(count || 0, totalCount || 0);

  return {
    data: {
      queryData,
      count,
      totalCount,
    },
    states: {
      error: errors || errorsCount,
      loading: loading || loadingCount,
      limit,
      currentPage,
      pageCount,
      pageProgress,
    },
    callbacks: {
      refetch,
      refetchCount,
      setLimit,
      setCurrentPage,
    },
  };
}
