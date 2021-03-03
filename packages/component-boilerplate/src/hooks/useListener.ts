import { useEffect, useHost, useCallback } from "@saasquatch/stencil-hooks";

/**
 * Use a listener on the stencil host component
 * 
 * @param name 
 * @param handler 
 * @param deps 
 */
export function useListener(
  name: string,
  handler: (event: unknown) => unknown,
  deps: unknown[] = []
) {
  const host = useHost();
  const callback = useCallback(handler, deps);
  useEffect(() => {
    host.addEventListener(name, callback);
    return () => host.removeEventListener(name, callback);
  }, [name, callback]);
}
