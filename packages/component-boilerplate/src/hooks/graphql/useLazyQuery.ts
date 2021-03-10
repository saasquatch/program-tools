import { useDeepMemo } from "../useDeepMemo";
import {
  BaseQueryData,
  GqlType,
  QueryData,
  useBaseQuery,
} from "./useBaseQuery";
import { useTick } from "../useTick";

const initialLazyQueryState: BaseQueryData = {
  loading: false,
  data: undefined,
  errors: undefined,
} as const;

export function useLazyQuery<T = any>(
  query: GqlType,
  variables: unknown
): [(e: unknown) => unknown, QueryData<T>] {
  const [state, update] = useBaseQuery<T>(
    query,
    initialLazyQueryState as BaseQueryData<T>
  );
  const [tick, forceUpdate] = useTick();
  useDeepMemo(() => {
    update(variables);
  }, [tick]);
  return [
    update,
    {
      ...state,
      // can override props when refetching for new pagination, offset, etc
      refetch: forceUpdate,
    },
  ];
}
