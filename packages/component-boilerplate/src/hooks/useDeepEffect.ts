/*
 *    Forked From: https://github.com/kentcdodds/use-deep-compare-effect/blob/main/src/index.ts
 *
 *    The MIT License (MIT)
 *    Copyright (c) 2020 Kent C. Dodds
 *
 */

import { useEffect, useRef, useMemo } from "@saasquatch/universal-hooks";
import { equal as deepEqual } from "@wry/equality";

type UseEffectParams = Parameters<typeof useEffect>;
type EffectCallback = UseEffectParams[0];
type DependencyList = UseEffectParams[1];
// yes, I know it's void, but I like what this communicates about
// the intent of these functions: It's just like useEffect
type UseEffectReturn = ReturnType<typeof useEffect>;


/**
 * @param value the value to be memoized (usually a dependency list)
 * @returns a memoized version of the value as long as it remains deeply equal
 */
export function useDeepCompareMemoize<T>(value: T) {
  const ref = useRef<T>(value);
  const signalRef = useRef<number>(0);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ref.current, [signalRef.current]);
}

export function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList
): UseEffectReturn {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;
