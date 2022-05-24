import { useReducer } from "@saasquatch/universal-hooks";

export function useTick(): readonly [number, () => unknown] {
  //@ts-expect-error -- bad typing on callback
  return useReducer<number, number, number>((x) => x + 1, 0);
}
