import decode from "jwt-decode";
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
  exp?: number;
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

function userIdentityFromJwt(jwt?: string): UserIdentity | undefined {
  if (!jwt) return undefined;

  try {
    const { user, exp } = decode<DecodedSquatchJWT>(jwt);

    // Check if the JWT has expired
    if (exp && Date.now() >= exp * 1000) {
      return undefined;
    }

    return {
      id: user.id,
      accountId: user.accountId,
      jwt,
    };
  } catch (e) {
    // Invalid JWT
    return undefined;
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
      // Portals can have the jwt provided as a URL parameter, so look for that first
      const searchParams = new URLSearchParams(document.location.search);
      if (searchParams.has("jwt")) {
        return userIdentityFromJwt(searchParams.get("jwt"));
      }

      // Look for user identity in local storage
      const stored = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
      if (!stored) return undefined;
      try {
        const potentialUserIdent = JSON.parse(stored) as UserIdentity;
        const identity = userIdentityFromJwt(potentialUserIdent.jwt);
        if (identity) {
          return {
            ...potentialUserIdent, // for any stored managedIdentity fields
            ...identity,
          };
        }
        return undefined;
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

  // Portals store identity in local storage
  if (identity && getEnvironmentSDK().type === "SquatchPortal") {
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
  const identity = useDomContext(host, CONTEXT_NAME) as
    | UserIdentity
    | undefined;

  const validIdentity = userIdentityFromJwt(identity?.jwt);
  if (!validIdentity) {
    // Likely that the JWT has expired
    setUserIdentity(undefined);
    return undefined;
  }
  return identity;
}
