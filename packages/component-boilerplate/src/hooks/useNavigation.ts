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
const history = makeHistory();

/**
 * Provides a way of navigating pages. Can be called from views or hooks or any code on the page.
 *
 * Doesn't include any information about the current page since the current page can change.
 *
 * To listen to page changes use `useCurrentPage`
 */
export const navigation: Navigation = {
  createHref: (...args) => history.createHref(...args),
  push: (...args) => history.push(...args),
  replace: (...args) => history.replace(...args),
  go: (...args) => history.go(...args),
  back: () => history.back(),
  forward: (...args) => history.forward(...args),
};

/**
 * Returns the current location. Similar to `window.location` but works with SPA page changes and virtual pages in Squatch.js
 */
export function useCurrentPage(): HistLocation {
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

/**
 * An immutable subset of the `History` API.
 *
 * Removes the mutable properties (action, block, actions, listen)
 */
export type Navigation = Omit<
  Omit<Omit<Omit<History, "location">, "block">, "action">,
  "listen"
>;
