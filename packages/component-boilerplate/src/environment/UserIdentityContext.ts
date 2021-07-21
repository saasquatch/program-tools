import { useDomContext } from "@saasquatch/dom-context-hooks";
import { ContextProvider } from "dom-context";
import { getEnvironmentSDK } from "./environment";
import { useHost } from "../hooks/useHost";

const CONTEXT_NAME = "sq:user-identity";
const USER_LOCAL_STORAGE_KEY = CONTEXT_NAME;

export type UserIdentity = {
  id: string;
  accountId: string;
  jwt?: string;
  managedIdentity?: {
    email: string;
    emailVerified: boolean;
    sessionData?: { [key: string]: any };
  };
};

export interface DecodedSquatchJWT {
  user: {
    accountId: string;
    id: string;
  };
}

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
      const stored = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
      if (!stored) return undefined;
      try {
        const potentialUserIdent = JSON.parse(stored) as UserIdentity;
        if (
          !potentialUserIdent.id ||
          !potentialUserIdent.accountId ||
          !potentialUserIdent.jwt
        ) {
          return undefined;
        }
        return potentialUserIdent;
      } catch (e) {
        // Not valid JSON
        return undefined;
      }
    case "SquatchAdmin":
    case "None":
      // Not logged in for admin portal / none default case
      return undefined;
  }
}

/**
 * Overide the globally defined user context, and persists the user identity in local storage
 *
 * @param identity the new identity of the user, or undefined if logged out
 */
export function setUserIdentity(identity?: UserIdentity) {
  _lazilyStartGlobally();
  const globalProvider = window.squatchUserIdentity;
  globalProvider.context = identity;
  if (identity) {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(identity));
  } else {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }
}

/**
 * Gets the SessionData of the current user, or undefined if logged out
 */
export function useSessionData(): { [key: string]: any } | undefined {
  return useUserIdentity()?.managedIdentity?.sessionData;
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
