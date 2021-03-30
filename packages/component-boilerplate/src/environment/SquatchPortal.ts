import { createContext } from "@saasquatch/dom-context-hooks";

/**
 * Environment provided by components hosted in a web component (`sqh-widget`)
 */
export type SquatchPortal = typeof SquatchPortalInstance;

declare global {
  interface Window {
    SquatchPortal?: PortalEnv;
  }
}

export type PortalEnv = {
  tenantAlias: string;
  appDomain: string;
};

export type UserIdentifier = {
  id: string;
  accountId: string;
};

export const SquatchPortalInstance = {
  userContext: createContext<UserIdentifier>("sq-context:user"),
  localeContext: createContext<string>("sq-context:locale"),
} as const;
