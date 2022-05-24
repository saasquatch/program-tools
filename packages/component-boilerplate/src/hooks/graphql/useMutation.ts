import { BaseQueryData, GqlType, useBaseQuery } from "./useBaseQuery";

const initialMutationState: BaseQueryData = {
  loading: false,
  data: undefined,
  errors: undefined,
} as const;

export function useMutation<T = any>(
  query: GqlType
): [(e: unknown) => unknown, BaseQueryData<T>] {
  const [state, update] = useBaseQuery<T>(
    query,
    initialMutationState as BaseQueryData<T>
  );
  return [update, state];
}
