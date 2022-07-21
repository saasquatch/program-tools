import { useEffect } from "@saasquatch/universal-hooks";
import {
  history,
  HistoryEntry,
  LazyHistory,
} from "@saasquatch/component-environment";
import { useTick } from "./useTick";

/**
 * Returns the current location. Similar to `window.location` but works with SPA page changes and virtual pages in Squatch.js
 */
export function useCurrentPage(): HistoryEntry {
  const [, tick] = useTick();
  useEffect(() => {
    const cleanup = history.listen(() => {
      // re-render
      tick();
    });
    return cleanup;
  }, []);

  return history.location;
}

export const navigation: LazyHistory = history;
