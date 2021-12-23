import { useCallback } from "@saasquatch/universal-hooks";
import { useDeepCompareEffect } from "../useDeepEffect";
import { useHost } from "../useHost";
import { GqlType } from "./useBaseQuery";

export const REFRESH_EVENT_NAME = "sq:refresh";

export function useRefreshDispatcher() {
  const host = useHost();

  const refresh = useCallback(() => {
    host.dispatchEvent(
      new CustomEvent(REFRESH_EVENT_NAME, {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          // Could add some "scope" for more granular refresh
        },
      })
    );
  }, [host]);

  return { refresh };
}

export function useRefreshListener({
  skip = false,
  update,
  variables,
  query,
}: {
  skip?: boolean;
  update: (variables: unknown, skipLoading?:boolean) => unknown;
  variables: unknown;
  query: GqlType;
}) {
  useDeepCompareEffect(() => {
    const listener = (e: CustomEvent) => {
      !skip && update(variables, true);
    };
    document.addEventListener(REFRESH_EVENT_NAME, listener);
    return () => document.removeEventListener(REFRESH_EVENT_NAME, listener);
  }, [query, variables, update, skip]);
}
