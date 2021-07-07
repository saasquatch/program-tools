import { WidgetIdent } from "./environment";

/**
 * Environment provided by components hosted in a web component (`sqh-widget`)
 */

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
> & { portalAuthUrl: string };
