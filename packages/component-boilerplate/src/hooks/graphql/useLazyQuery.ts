import { useDeepMemo } from "../useDeepMemo";
import { useBaseQuery } from "./useBaseQuery";
import { GqlType } from "./GqlType";
import { useTick } from "../useTick";
import { QueryData, BaseQueryData } from "./QueryData";

const initialLazyQueryState: BaseQueryData = {
  loading: false,
  data: undefined,
  errors: undefined,
} as const;

export function useLazyQuery<T = any>(
  query: GqlType,
  variables: unknown
): QueryData<T> {
  const [state, update] = useBaseQuery<T>(
    query,
    initialLazyQueryState as BaseQueryData<T>
  );
  const [tick, forceUpdate] = useTick();
  useDeepMemo(() => {
    update(variables);
  }, [tick]);
  return {
    ...state,
    // can override props when refetching for new pagination, offset, etc
    refetch: forceUpdate,
  };
}
