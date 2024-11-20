import equal from "@wry/equality";
import decode from "jwt-decode";
import { ContextProvider } from "dom-context";
import {
  DecodedSquatchJWT,
  VERIFICATION_CONTEXT_NAME,
  VerificationContext,
} from "../types";
import { getUserIdentity } from "./UserIdentityContext";
import { debug as _debug } from "../debug";

const debug = (...args: any[]) => _debug(VERIFICATION_CONTEXT_NAME, ...args);

export function lazilyStartVerificationContext() {
  let globalProvider = window.squatchVerification;
  if (!globalProvider) {
    globalProvider = new ContextProvider<VerificationContext | undefined>({
      element: document.documentElement,
      // Unless we want to do session management, verified status should be renewed on each widget load
      initialState: undefined,
      contextName: VERIFICATION_CONTEXT_NAME,
    }).start();

    window.squatchVerification = globalProvider;
  }

  return globalProvider;
}

export function checkVerificationToken(token: string) {
  if (!token) return false;

  const decoded = decode<DecodedSquatchJWT>(token);

  // Check if token is valid object
  const isSquatchJWT =
    decoded.user && decoded.user.id && decoded.user.accountId;
  if (!isSquatchJWT) return false;

  // Check if verification JWT credentials match with current user
  const currentUser = getUserIdentity();
  if (
    decoded.user.id !== currentUser?.id ||
    decoded.user.accountId !== currentUser?.accountId
  )
    return false;

  return true;
}

export function setVerificationContext(context: VerificationContext) {
  const globalProvider = lazilyStartVerificationContext();

  if (!equal(globalProvider.context, context)) {
    debug(`Setting verification context to [${JSON.stringify(context)}]`);
    globalProvider.context = context;
  }
}

export function getVerificationContext() {
  return window.squatchVerification?.context;
}
