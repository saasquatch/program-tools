import { useEffect } from "@saasquatch/universal-hooks";
import {
  createBrowserHistory,
  createMemoryHistory,
  History,
  Location as HistLocation,
  To,
} from "history";
import { getEnvironmentSDK } from "../environment/environment";
import { useTick } from "./useTick";

/**
 * Instatiates a global `history` object that everything will connect to.
 *
 * This is not set in context, because it really should be global in a similar way to `window.location.push` for simplicity in setting up navigation
 */
function makeHistory(): History {
  switch (getEnvironmentSDK().type) {
    case "SquatchPortal":
      return createBrowserHistory();
    default:
      return createMemoryHistory();
  }
}

declare global {
  interface Window {
    squatchHistory: History;
  }
}

window.squatchHistory = makeHistory();

/**
 * Provides a way of navigating pages. Can be called from views or hooks or any code on the page.
 *
 * Doesn't include any information about the current page since the current page can change.
 *
 * To listen to page changes use `useCurrentPage`
 */
export const navigation: Navigation = {
  createHref: (...args) => window.squatchHistory.createHref(...args),
  push: (...args) => window.squatchHistory.push(...args),
  replace: (...args) => window.squatchHistory.replace(...args),
  go: (...args) => window.squatchHistory.go(...args),
  back: () => window.squatchHistory.back(),
  forward: (...args) => window.squatchHistory.forward(...args),
};

/**
 * Returns the current location. Similar to `window.location` but works with SPA page changes and virtual pages in Squatch.js
 */
export function useCurrentPage(): HistLocation {
  const [, tick] = useTick();
  useEffect(() => {
    const cleanup = window.squatchHistory.listen(() => {
      // re-render
      tick();
    });
    return cleanup;
  }, []);

  return window.squatchHistory.location;
}

/**
 * An immutable subset of the `History` API.
 *
 * Removes the mutable properties (action, block, actions, listen)
 */
export type Navigation = Omit<
  Omit<Omit<Omit<History, "location">, "block">, "action">,
  "listen"
>;
