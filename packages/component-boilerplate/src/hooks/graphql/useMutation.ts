import { type BaseQueryData, type GqlType, useBaseQuery } from "./useBaseQuery.ts";

const initialMutationState: BaseQueryData = {
  loading: false,
  data: undefined,
  errors: undefined,
} as const;

export function useMutation<T = any>(
  query: GqlType
): [(e: unknown) => Promise<T | Error>, BaseQueryData<T>] {
  const [state, update] = useBaseQuery<T>(
    query,
    initialMutationState as BaseQueryData<T>
  );
  return [update, state];
}
