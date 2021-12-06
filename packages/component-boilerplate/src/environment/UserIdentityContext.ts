import decode from "jwt-decode";
import { useDomContext } from "@saasquatch/dom-context-hooks";
import { ContextProvider } from "dom-context";
import { getEnvironmentSDK } from "./environment";
import { useHost } from "../hooks/useHost";
import { equal } from "@wry/equality";

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
  user?: {
    accountId: string;
    id: string;
  };
}

// NOTE: Classic theme-engine JWT's do not have a typical payload,
// they have a sub in the form base64(accountId):base64(userId)@tenantAlias:users
export interface DecodedWidgetAPIJWT {
  exp?: number;
  sub?: string;
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

function isDecodedSquatchJWT(decoded: any): decoded is DecodedSquatchJWT {
  return decoded.user && decoded.user.id && decoded.user.accountId;
}

function isDecodedWidgetAPIJWT(decoded: any): decoded is DecodedWidgetAPIJWT {
  return decoded.sub && /.*:.*@.*:users/.test(decoded.sub);
}

function userIdentityFromJwt(jwt?: string): UserIdentity | undefined {
  if (!jwt) return undefined;

  try {
    const decoded = decode<DecodedSquatchJWT | DecodedWidgetAPIJWT>(jwt);
    const exp = decoded.exp;

    let userId: string, accountId: string;

    if (isDecodedWidgetAPIJWT(decoded)) {
      // Pull the accountId and userId from the subject and Base64-decode them
      // NOTE: This is to support classic theme engine widget token generation
      const matches = decoded.sub.match(/(.*):(.*)@(.*):users/);
      accountId = atob(matches[1]);
      userId = atob(matches[2]);
    } else if (isDecodedSquatchJWT(decoded)) {
      accountId = decoded.user.accountId;
      userId = decoded.user.id;
    }

    if (!userId || !accountId) {
      return undefined;
    }

    // Check if the JWT has expired
    if (exp && Date.now() >= exp * 1000) {
      return undefined;
    }

    return {
      id: userId,
      accountId: accountId,
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

  if (!equal(globalProvider.context, identity)) {
    globalProvider.context = identity;
  }

  // Portals store identity in local storage
  if (identity && getEnvironmentSDK().type === "SquatchPortal") {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(identity));
  } else if(!identity) {
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
  if (identity && !validIdentity) {
    // Likely that the JWT has expired
    setUserIdentity(undefined);
    return undefined;
  }
  return identity;
}
