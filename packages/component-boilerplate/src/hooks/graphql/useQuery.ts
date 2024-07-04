import { useDeepMemo } from "../useDeepMemo";
import { useTick } from "../useTick";
import { useRefreshListener } from "./Refresh";
import {
  BaseQueryData,
  GqlType,
  QueryData,
  useBaseQuery,
} from "./useBaseQuery";

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self

  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

export const initialQueryState: BaseQueryData = {
  loading: true,
  data: undefined,
  errors: undefined,
} as const;

export function useQuery<T = any>(
  query: GqlType,
  variables: unknown,
  skip?: boolean,
  options = { merge: true }
): QueryData<T> {
  const [state, update] = useBaseQuery<T>(
    query,
    initialQueryState as BaseQueryData<T>,
    options
  );

  const [tick, forceUpdate] = useTick();

  useDeepMemo(() => {
    !skip && update(variables);
  }, [query, variables, update, tick, skip]);

  useRefreshListener({ skip, update, variables });

  return deepFreeze({
    ...state,
    // can override props when refetching for new pagination, offset, etc
    refetch: forceUpdate,
  });
}
