import { useDeepMemo } from "../useDeepMemo";
import { useBaseQuery } from "./useBaseQuery";
import { GqlType } from "./GqlType";
import { useTick } from "../useTick";
import { QueryData, BaseQueryData } from "./QueryData";

export const initialQueryState: BaseQueryData = {
  loading: true,
  data: undefined,
  errors: undefined,
} as const;

export function useQuery<T = any>(
  query: GqlType,
  variables: unknown
): QueryData<T> {
  const [state, update] = useBaseQuery<T>(
    query,
    initialQueryState as BaseQueryData<T>
  );

  const [tick, forceUpdate] = useTick();

  useDeepMemo(() => {
    update(variables);
  }, [variables, update, tick]);
  return {
    ...state,
    // can override props when refetching for new pagination, offset, etc
    refetch: forceUpdate,
  };
}
