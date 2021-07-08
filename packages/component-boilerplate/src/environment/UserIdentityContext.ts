import { useDomContext } from "@saasquatch/dom-context-hooks";
import { ContextProvider } from "dom-context";
import { getEnvironmentSDK, useHost } from "..";

const CONTEXT_NAME = "sq:user-identity";

export type UserIdentity = {
  id: string;
  accountId: string;
  jwt?: string;
  sessionData?: { [key: string]: any };
};

declare global {
  interface Window {
    squatchUserIdentity: ContextProvider<UserIdentity>;
  }
}

function _lazilyStartGlobally() {
  const globalProvider = window.squatchUserIdentity;
  if (!globalProvider) {
    // Lazily creates a global provider
    window.squatchUserIdentity = new ContextProvider<UserIdentity>({
      element: document.documentElement,
      initialState: _getInitialValue(),
      contextName: CONTEXT_NAME,
    }).start();
  }
}

function _getInitialValue(): UserIdentity | undefined {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchAndroid":
    case "SquatchJS2":
      return {
        id: sdk.widgetIdent.userId,
        accountId: sdk.widgetIdent.accountId,
        jwt: sdk.widgetIdent.token,
      };
    case "SquatchPortal":
      // TODO: Could this come from localstorage? Or a cookie?
      return undefined;
    case "SquatchAdmin":
    case "None":
      // Not logged in for admin portal / none default case
      return undefined;
  }
}

/**
 * Overide the globally defined user context
 *
 * @param identity the new identity of the user, or undefined if logged out
 */
export function setUserIdentity(identity?: UserIdentity) {
  _lazilyStartGlobally();
  const globalProvider = window.squatchUserIdentity;
  globalProvider.context = identity;
}

/**
 * Gets the SessionData of the current user, or undefined if logged out
 */
export function useSessionData(): { [key: string]: any } | undefined {
  return useUserIdentity()?.sessionData;
}

/**
 * Gets the JWT of the current user, or undefined if logged out
 */
export function useToken(): string | undefined {
  return useUserIdentity()?.jwt;
}

/**
 * Get the IDs and JWT of the current user, or undefined if logged out
 */
export function useUserIdentity(): UserIdentity | undefined {
  _lazilyStartGlobally();
  const host = useHost();
  return useDomContext(host, CONTEXT_NAME);
}
