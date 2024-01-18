import { useDomContextState } from "@saasquatch/dom-context-hooks";

type ParentStateProps = {
  host: HTMLElement;
  namespace: string;
  initialValue: unknown;
};

export type StateType<T> = [value: T, setValue: (value: T) => void];

export function useParentState<T>(props: ParentStateProps): StateType<T> {
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

export function getContextValueName(namespace: string) {
  return namespace + "-value";
}

export function getContextName(namespace: string) {
  return namespace + "-state";
}
