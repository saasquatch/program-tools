import decode from "jwt-decode";
import { ContextProvider } from "dom-context";
import { equal } from "@wry/equality";
import { getEnvironmentSDK, getTenantAlias } from "../environment";
import {
  USER_CONTEXT_NAME,
  UserIdentity,
  DecodedSquatchJWT,
  DecodedWidgetAPIJWT,
} from "../types";
import { startUserContextListenerForLocale } from "../listeners";
import { debug as _debug } from "../debug";

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
      initialState: _getInitialValue(),
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
  return decoded.sub && /.*:.*@.*:users/.test(decoded.sub);
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
    const decoded = decode<DecodedSquatchJWT | DecodedWidgetAPIJWT>(jwt);
    const exp = decoded.exp;

    let userId: string | undefined = undefined;
    let accountId: string | undefined = undefined;
    let tenantAlias: string | undefined = undefined;

    if (isDecodedWidgetAPIJWT(decoded)) {
      // Pull the accountId and userId from the subject and Base64-decode them
      // This also applies to JWTs generated for microsite sessions
      // NOTE: This is to support classic theme engine widget token generation
      const matches = decoded.sub.match(/(.*):(.*)@(.*):users/);
      if (matches?.[1]) accountId = atob(matches[1]);
      if (matches?.[2]) userId = atob(matches[2]);
      if (matches?.[3]) tenantAlias = matches[3];
    } else if (isDecodedSquatchJWT(decoded)) {
      accountId = decoded.user.accountId;
      userId = decoded.user.id;
    }

    if (!userId || !accountId) {
      debug("No user information");
      return undefined;
    }

    if (tenantAlias && getTenantAlias() && tenantAlias !== getTenantAlias()) {
      debug("tenantAlias in JWT doesn't match environment");
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
      jwt,
    };
  } catch (e) {
    debug("Invalid JWT");
    // Invalid JWT
    return undefined;
  }
}

function _getInitialValue(): UserIdentity | undefined {
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
        jwt: sdk.widgetIdent.token,
      };
    case "SquatchPortal":
      // Portals can have the jwt provided as a URL parameter, so look for that first
      const searchParams = new URLSearchParams(document.location.search);
      if (searchParams.has("jwt")) {
        return userIdentityFromJwt(searchParams.get("jwt")!);
      }

      // Look for user identity in local storage
      const stored = localStorage.getItem(USER_CONTEXT_NAME);
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
