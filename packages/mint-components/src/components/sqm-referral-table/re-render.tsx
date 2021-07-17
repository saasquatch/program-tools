import { useHost, useTick } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";

export const RENDER_EVENT = "sqm:request-rerender";

/**
 * Requests a re-render for the wrapping table
 *
 * Useful when an attribute or other internal state changes
 *
 * @param deps an array of dependencies used for useEffect
 */
export function useRequestRerender(deps: unknown[]) {
  const host = useHost();
  useEffect(() => {
    host.dispatchEvent(
      new CustomEvent(RENDER_EVENT, {
        detail: true,
        bubbles: true,
        composed: true,
      })
    );
  }, deps);
}

/**
 * Re-renders a parent component when child components make the request
 */
export function useRerenderListener() {
  const host = useHost();
  const [tick, rerender] = useTick();
  useEffect(() => {
    const listener = (e: CustomEvent) => {
      // Preventes recursively nested components from sending requests up all the way
      e.stopPropagation();
      rerender();
    };
    host.addEventListener(RENDER_EVENT, listener);
    return () => {
      host.removeEventListener(RENDER_EVENT, listener);
    };
  }, []);
  return tick;
}
