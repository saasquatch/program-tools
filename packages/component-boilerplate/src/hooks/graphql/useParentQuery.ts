import { useDomContextState } from "@saasquatch/dom-context-hooks";
import { useDomContext } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { deepEqual } from "fast-equals";
import { getContextValueName } from "../useParentState";
import { useHost } from "../useHost";
import { useQuery } from "./useQuery";
import { QueryData } from "./useBaseQuery";

type ParentQueryProps = {
  namespace: string;
  query?: string;
  variables?: { [key: string]: unknown };
  skip?: boolean;
};

export function useParentQuery<T>(props: ParentQueryProps): QueryData<T> {
  const host = useHost();
  const query = useQuery(props.query, props.variables || {}, props.skip);

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
