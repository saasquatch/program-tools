import { P, r as rn } from './index.module-b74a7f69.js';
import { i as useEffect } from './stencil-hooks.module-f4b05383.js';

const RENDER_EVENT = "sqm:request-rerender";
/**
 * Requests a re-render for the wrapping table
 *
 * Useful when an attribute or other internal state changes
 *
 * @param deps an array of dependencies used for useEffect
 */
function useRequestRerender(deps) {
  const host = P();
  useEffect(() => {
    host.dispatchEvent(new CustomEvent(RENDER_EVENT, {
      detail: true,
      bubbles: true,
      composed: true,
    }));
  }, deps);
}
/**
 * Re-renders a parent component when child components make the request
 */
function useRerenderListener() {
  const host = P();
  const [tick, rerender] = rn();
  useEffect(() => {
    const listener = (e) => {
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

export { useRerenderListener as a, useRequestRerender as u };
