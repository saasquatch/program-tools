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

function lazyHistory() {
  window.squatchHistory = window.squatchHistory || makeHistory();
  return window.squatchHistory;
}

/**
 * Provides a way of navigating pages. Can be called from views or hooks or any code on the page.
 *
 * Doesn't include any information about the current page since the current page can change.
 *
 * To listen to page changes use `useCurrentPage`
 */
export const navigation: Navigation = {
  createHref: (...args) => lazyHistory().createHref(...args),
  push: (...args) => lazyHistory().push(...args),
  replace: (...args) => lazyHistory().replace(...args),
  go: (...args) => lazyHistory().go(...args),
  back: () => lazyHistory().back(),
  forward: (...args) => lazyHistory().forward(...args),
};

/**
 * Returns the current location. Similar to `window.location` but works with SPA page changes and virtual pages in Squatch.js
 */
export function useCurrentPage(): HistLocation {
  const [, tick] = useTick();
  useEffect(() => {
    const cleanup = lazyHistory().listen(() => {
      // re-render
      tick();
    });
    return cleanup;
  }, []);

  return lazyHistory().location;
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
