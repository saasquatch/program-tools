import { equal } from "@wry/equality";
import { useRef } from "@saasquatch/stencil-hooks";

export function useDeepMemo<TKey, TValue>(
  memoFn: () => TValue,
  key: TKey
): TValue {
  //@ts-ignore
  const ref = useRef<{ key: TKey; value: TValue }>();

  if (!ref.current || !equal(key, ref.current.key)) {
    ref.current = { key, value: memoFn() };
  }

  return ref.current.value;
}
