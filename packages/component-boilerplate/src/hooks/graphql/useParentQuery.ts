import { useDomContextState } from "@saasquatch/dom-context-hooks";
import { useDomContext } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { deepEqual } from "fast-equals";
import { getContextValueName } from "../useParentState.ts";
import { useHost } from "../useHost.ts";
import { useQuery } from "./useQuery.ts";
import type { QueryData } from "./useBaseQuery.ts";

type ParentQueryProps = {
  namespace: string;
  query?: string;
  variables?: { [key: string]: unknown };
  skip?: boolean;
  options?: { batch?: boolean };
};

export function useParentQuery<T>(props: ParentQueryProps): QueryData<T> {
  const host = useHost();
  const query = useQuery(props.query, props.variables || {}, props.skip, {
    batch: true,
    ...(props.options || {}),
  });

  const [value, setValue] = useDomContextState<QueryData<any>>(
    host,
    getContextValueName(props.namespace),
    query
  );

  useEffect(() => {
    if (deepEqual(query, value)) return;
    setValue(query);
  }, [query, value]);

  return query;
}

export function useParentQueryValue<T>(namespace: string): QueryData<T> {
  const parentValue = useDomContext<QueryData<T> | undefined>(
    getContextValueName(namespace)
  );

  if (!parentValue)
    return {
      data: null,
      loading: true,
      refetch: () => console.warn("component still loading"),
    } as QueryData<T>;
  return parentValue;
}
