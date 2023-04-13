import { useDomContext } from "@saasquatch/dom-context-hooks";
import { useHost } from "../useHost";
import {
  UserIdentity,
  USER_CONTEXT_NAME,
  lazilyStartUserContext,
  setUserIdentity,
  userIdentityFromJwt,
  isDemo,
} from "@saasquatch/component-environment";

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
  lazilyStartUserContext();
  const host = useHost();
  const identity = useDomContext(host, USER_CONTEXT_NAME) as
    | UserIdentity
    | undefined;

  const validIdentity = userIdentityFromJwt(identity?.jwt);
  if (!isDemo() && identity && !validIdentity) {
    // Likely that the JWT has expired
    setUserIdentity(undefined);
    return undefined;
  }
  return identity;
}
