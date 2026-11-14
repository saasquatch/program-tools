import { equal } from "@wry/equality";
import { ContextProvider } from "dom-context";
import { jwtDecode } from "jwt-decode";
import { debug as _debug } from "../debug.ts";
import { getEnvironmentSDK } from "../environment.ts";
import { startUserContextListenerForLocale } from "../listeners.ts";
import {
  USER_CONTEXT_NAME,
  type UserIdentity,
  type DecodedSquatchJWT,
  type DecodedWidgetAPIJWT,
} from "../types.ts";

const debug = (...args: any[]) => _debug(USER_CONTEXT_NAME, ...args);

/**
 * Lazily start the user context provider. If it already exists, the existing provider is
 * returned. This function is safe to call multiple times.
 *
 * @returns The global user context provider
 */
export function lazilyStartUserContext() {
  let globalProvider = window.squatchUserIdentity;

  if (!globalProvider) {
    debug("Creating user context provider");

    // Lazily creates a global provider
    globalProvider = new ContextProvider<UserIdentity | undefined>({
      element: document.documentElement,
      initialState: getInitialValue(),
      contextName: USER_CONTEXT_NAME,
    }).start();

    window.squatchUserIdentity = globalProvider;
    startUserContextListenerForLocale();
  }

  return globalProvider;
}

function isDecodedSquatchJWT(decoded: any): decoded is DecodedSquatchJWT {
  return decoded.user && decoded.user.id && decoded.user.accountId;
}

function isDecodedWidgetAPIJWT(decoded: any): decoded is DecodedWidgetAPIJWT {
  return (
    decoded.sub &&
    /^[A-Za-z0-9+/=_-]*:[A-Za-z0-9+/=_-]*@[^@]*:users$/.test(decoded.sub)
  );
}

/**
 * Extract a user identity from a JWT
 *
 * @param jwt The JWT to extract a user identity from
 * @returns The user identity or undefined if the JWT is not valid
 */
export function userIdentityFromJwt(jwt?: string): UserIdentity | undefined {
  if (!jwt) return undefined;

  try {
    const decoded = jwtDecode<DecodedSquatchJWT | DecodedWidgetAPIJWT>(jwt);
    const exp = decoded.exp;

    let userId: string | undefined = undefined;
    let accountId: string | undefined = undefined;
    let email: string | undefined = undefined;

    if (isDecodedWidgetAPIJWT(decoded)) {
      // Pull the accountId and userId from the subject and Base64-decode them
      // NOTE: This is to support classic theme engine widget token generation
      const matches = decoded.sub.match(
        /^([A-Za-z0-9+/=_-]*):([A-Za-z0-9+/=_-]*)@([^@]*):users$/,
      );
      if (matches?.[1]) accountId = atob(matches[1]);
      if (matches?.[2]) userId = atob(matches[2]);
    } else if (isDecodedSquatchJWT(decoded)) {
      accountId = decoded.user.accountId;
      userId = decoded.user.id;
      email = decoded.user.email;
    }

    if (!userId || !accountId) {
      debug("No user information");
      return undefined;
    }

    // Check if the JWT has expired
    if (exp && Date.now() >= exp * 1000) {
      debug("JWT has expired");
      return undefined;
    }

    return {
      id: userId,
      accountId: accountId,
      email,
      jwt,
    };
  } catch {
    debug("Invalid JWT");
    // Invalid JWT
    return undefined;
  }
}

function isUserIdentity(value: unknown): value is UserIdentity {
  if (
    typeof value !== "object" ||
    value === null ||
    !("id" in value) ||
    typeof value.id !== "string" ||
    !("accountId" in value) ||
    typeof value.accountId !== "string" ||
    ("email" in value &&
      value.email !== undefined &&
      typeof value.email !== "string") ||
    ("jwt" in value && value.jwt !== undefined && typeof value.jwt !== "string")
  ) {
    return false;
  }

  if (!("managedIdentity" in value) || value.managedIdentity === undefined) {
    return true;
  }

  const managed = value.managedIdentity;
  return (
    typeof managed === "object" &&
    managed !== null &&
    "email" in managed &&
    typeof managed.email === "string" &&
    "emailVerified" in managed &&
    typeof managed.emailVerified === "boolean" &&
    (!("sessionData" in managed) ||
      managed.sessionData === undefined ||
      (typeof managed.sessionData === "object" &&
        managed.sessionData !== null &&
        !Array.isArray(managed.sessionData)))
  );
}

function getInitialValue(): UserIdentity | undefined {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchIOS":
    case "SquatchAndroid":
    case "SquatchJS2":
      if (!sdk.widgetIdent) return undefined;

      const { userId, accountId, token } = sdk.widgetIdent;

      if (!userId || !accountId || !token) return undefined;

      return {
        id: sdk.widgetIdent.userId,
        accountId: sdk.widgetIdent.accountId,
        email: sdk.widgetIdent.email,
        jwt: sdk.widgetIdent.token,
      };
    case "SquatchPortal":
      // Portals can have the jwt provided as a URL parameter, so look for that first
      const searchParams = new URLSearchParams(document.location.search);
      if (searchParams.has("jwt")) {
        const identity = userIdentityFromJwt(searchParams.get("jwt")!);
        localStorage.setItem(USER_CONTEXT_NAME, JSON.stringify(identity));
        return identity;
      }

      // Look for user identity in local storage
      const stored = localStorage.getItem(USER_CONTEXT_NAME);
      if (!stored) return undefined;
      try {
        const potentialUserIdent: unknown = JSON.parse(stored);
        if (!isUserIdentity(potentialUserIdent)) {
          debug("Invalid stored user identity");
          return undefined;
        }
        const identity = userIdentityFromJwt(potentialUserIdent.jwt);
        if (identity) {
          return {
            ...potentialUserIdent, // for any stored managedIdentity fields
            ...identity,
          };
        }
        return undefined;
      } catch {
        debug("Invalid stored user identity JSON");
        return undefined;
      }
    case "SquatchAdmin":
    case "None":
    default:
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
  const globalProvider = lazilyStartUserContext();

  if (!equal(globalProvider.context, identity)) {
    debug(`Setting user context value [${JSON.stringify(identity)}]`);
    globalProvider.context = identity;
  }

  // Portals store identity in local storage
  if (identity && getEnvironmentSDK().type === "SquatchPortal") {
    localStorage.setItem(USER_CONTEXT_NAME, JSON.stringify(identity));
  } else if (!identity) {
    localStorage.removeItem(USER_CONTEXT_NAME);
  }
}

/**
 * Get the current value of the user context
 */
export function getUserIdentity() {
  return window.squatchUserIdentity?.context;
}
