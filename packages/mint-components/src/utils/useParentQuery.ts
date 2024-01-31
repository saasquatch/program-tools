import { useQuery } from "@saasquatch/component-boilerplate";
import { QueryData } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import { useDomContextState } from "@saasquatch/dom-context-hooks";
import { useDomContext } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { deepEqual } from "fast-equals";
import { getContextValueName } from "./useParentState";

type ParentQueryProps = {
  host: HTMLElement;
  namespace: string;
  query?: string;
  variables?: { [key: string]: unknown };
  skip?: boolean;
};

export function useParentQuery<T>(props: ParentQueryProps): QueryData<T> {
  const query = useQuery(props.query, props.variables || {}, props.skip);

  const [value, setValue] = useDomContextState<QueryData<any>>(
    props.host,
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
