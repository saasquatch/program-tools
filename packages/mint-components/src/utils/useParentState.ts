import { useDomContextState } from "@saasquatch/dom-context-hooks";
import { useDomContext } from "@saasquatch/stencil-hooks";

export type StateType<T> = [value?: T, setValue?: (value: T) => void];

type ParentStateProps<T> = {
  host: HTMLElement;
  namespace: string;
  initialValue: T;
};

export function useParentState<T>(props: ParentStateProps<T>): StateType<T> {
  const [value, setValue] = useDomContextState<T>(
    props.host,
    getContextValueName(props.namespace),
    props.initialValue as T
  );

  useDomContextState<StateType<T>>(
    props.host,
    getContextName(props.namespace),
    [value, setValue]
  );

  return [value, setValue];
}

export function useParent<T>(namespace: string): StateType<T | undefined> {
  const parent = useDomContext<StateType<T | undefined>>(
    getContextName(namespace)
  );

  const parentValue = useDomContext<T | undefined>(
    getContextValueName(namespace)
  );

  if (!parent) return [undefined, undefined];
  return [parentValue, parent[1]];
}

export function getContextValueName(namespace: string) {
  return namespace + "-value";
}

export function getContextName(namespace: string) {
  return namespace + "-state";
}
