import { useDomContextState } from "@saasquatch/dom-context-hooks";
import { useDomContext } from "@saasquatch/stencil-hooks";
import { useHost } from "./useHost";

export type StateType<T> = [value?: T, setValue?: (value: T) => void];

type ParentStateProps<T> = {
  namespace: string;
  initialValue?: T;
};

export function useParentState<T>(props: ParentStateProps<T>): StateType<T> {
  const host = useHost();
  const [value, setValue] = useDomContextState<T>(
    host,
    getContextValueName(props.namespace),
    props.initialValue as T
  );

  useDomContextState<StateType<T>>(host, getContextName(props.namespace), [
    value,
    setValue,
  ]);

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

export function useSetParent<T>(
  namespace: string
): (value: T) => void | undefined {
  const parent = useDomContext<StateType<T | undefined>>(
    getContextName(namespace)
  );
  if (!parent) return undefined;
  return parent[1];
}

export function useParentValue<T>(namespace: string): T | undefined {
  const parentValue = useDomContext<T | undefined>(
    getContextValueName(namespace)
  );

  if (!parentValue) undefined;
  return parentValue;
}

export function getContextValueName(namespace: string) {
  return namespace + "-value";
}

export function getContextName(namespace: string) {
  return namespace + "-state";
}
