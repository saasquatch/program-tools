import {
  BaseQueryData,
  GqlType,
  QueryData,
  useBaseQuery,
} from "./useBaseQuery";

const initialLazyQueryState: BaseQueryData = {
  loading: false,
  data: undefined,
  errors: undefined,
} as const;

export function useLazyQuery<T = any>(
  query: GqlType
): [(e: unknown) => unknown, QueryData<T>] {
  const [state, update] = useBaseQuery<T>(
    query,
    initialLazyQueryState as BaseQueryData<T>
  );

  return [
    update,
    {
      ...state,
      // can override props when refetching for new pagination, offset, etc
      refetch: (variables) => update(variables),
    },
  ];
}
