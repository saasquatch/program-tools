import { useQuery } from '@saasquatch/component-boilerplate';
import { usePagination } from './usePagination';

export type Envelope<T = unknown> = {
  data: T[];
  totalCount?: number;
};

export type PageVars = {
  offset: number;
  limit: number;
};

/**
 * dataPath MUST use the question mark operator when accessing fields.
 * If it doesn't then it will violate a Rule of Hooks
 */
export function usePaginatedQuery<TData, TVars extends { [key: string]: any } = {}>(
  query: any,
  dataPath: (data: any) => Envelope<TData>,
  pageVars: PageVars,
  extraVars: TVars = {} as TVars,
) {
  const { limit, offset, setLimit, setCurrentPage, calculatePagination } = usePagination(pageVars);

  const variables = { limit, offset, ...extraVars };

  const { loading, errors, data, refetch } = useQuery(query, variables);

  // this value needs to be accessed using the ? operator
  // react throws a hook error otherwise
  console.log("data", data)
  const envelope = dataPath(data);

  const { currentPage, pageCount, pageProgress } = calculatePagination(envelope?.data?.length || 0, envelope?.totalCount || 0);

  return {
    envelope,
    states: {
      errors,
      loading,
      limit,
      currentPage,
      pageCount,
      pageProgress,
    },
    callbacks: {
      refetch,
      setLimit,
      setCurrentPage,
    },
  };
}
