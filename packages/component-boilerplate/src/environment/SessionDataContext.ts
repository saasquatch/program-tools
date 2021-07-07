// import { useDomContext } from "@saasquatch/dom-context-hooks";
// import { ContextProvider } from "dom-context";
// import { getEnvironmentSDK, useHost } from "..";

// const CONTEXT_NAME = "sq:user-identity";

// export type SessionData = {
//   [key: string]: any;
// } | null;

// declare global {
//   interface Window {
//     squatchPortalSessionData: ContextProvider<SessionData>;
//   }
// }

// function _lazilyStartGlobally() {
//   const globalProvider = window.squatchUserIdentity;
//   if (!globalProvider) {
//     // Lazily creates a global provider
//     window.squatchPortalSessionData = new ContextProvider<SessionData>({
//       element: document.documentElement,
//       initialState: null,
//       contextName: CONTEXT_NAME,
//     }).start();
//   }
// }

// /**
//  * Overide the globally defined user context
//  *
//  * @param identity the new identity of the user, or undefined if logged out
//  */
// export function setUserIdentity(sessionData: SessionData = null) {
//   _lazilyStartGlobally();
//   const globalProvider = window.squatchUserIdentity;
//   globalProvider.context = sessionData;
// }

// /**
//  * Gets the JWT of the current user, or undefined if logged out
//  */
// export function useToken(): string | undefined {
//   return useUserIdentity()?.jwt;
// }

// /**
//  * Get the IDs and JWT of the current user, or undefined if logged out
//  */
// export function useUserIdentity(): UserIdentity | undefined {
//   _lazilyStartGlobally();
//   const host = useHost();
//   return useDomContext(host, CONTEXT_NAME);
// }
