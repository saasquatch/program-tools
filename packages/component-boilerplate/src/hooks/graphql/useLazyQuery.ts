import {
  BaseQueryData,
  GqlType,
  QueryData,
} from "./useBaseQuery";
import { useBatchedQuery } from "./useBatchedQuery";

const initialLazyQueryState: BaseQueryData = {
  loading: false,
  data: undefined,
  errors: undefined,
} as const;

export function useLazyQuery<T = any>(
  query: GqlType
): [(e: unknown) => unknown, QueryData<T>] {
  const [state, update] = useBatchedQuery<T>(
    query,
    initialLazyQueryState as BaseQueryData<T>
  );

  return [
    update,
    {
      ...state,
      // can override props when refetching for new pagination, offset, etc
      refetch: (variables) => update(variables)
    },
  ];
}
