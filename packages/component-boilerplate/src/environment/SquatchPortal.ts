import { createContext } from "@saasquatch/dom-context-hooks";
import { WidgetIdent } from "./environment";

/**
 * Environment provided by components hosted in a web component (`sqh-widget`)
 */
export type SquatchPortal = typeof SquatchPortalInstance;

declare global {
  interface Window {
    SquatchPortal?: PortalEnv;
  }
}

/**
 * Portal env doesn't include User Id
 */
export type PortalEnv = Pick<
  WidgetIdent,
  "tenantAlias" | "appDomain" | "programId"
>;

export const SquatchPortalInstance = {
  localeContext: createContext<string>("sq-context:locale"),
} as const;
