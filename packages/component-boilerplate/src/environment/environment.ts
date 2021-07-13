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

/**
 * Program ID context helpers
 */
export { useProgramId, setProgramId } from "./ProgramContext";

/**
 * User identity context helpers
 */
export {
  useUserIdentity,
  usePersistedUserIdentity,
  useToken,
  setUserIdentity,
  setPersistedUserIdentity,
} from "./UserIdentityContext";

/**
 * Provided by the SaaSquatch GraphQL backend when a widget is rendered.
 *
 * Source: https://github.com/saasquatch/saasquatch/blob/805e51284f818f8656b6458bcee6181f378819d3/packages/saasquatch-core/app/saasquatch/controllers/api/widget/WidgetApi.java
 *
 */
export interface WidgetIdent {
  tenantAlias: string;
  appDomain: string;
  token: string;
  userId: string;
  accountId: string;

  engagementMedium?: "POPUP" | "EMBED";
  programId?: string;
}

/**
 * An interface for interacting with the SaaSquatch Admin Portal.
 *
 * Used for rendering widgets in a preview/demo mode.
 */
export interface SquatchAdmin {
  /**
   * Provides a way of providing user feedback when a widget is rendered in the SaaSquatch admin portal
   *
   * @param text
   */
  showMessage(text: string): void;
}

/**
 * Type for the Javascript environment added by https://github.com/saasquatch/squatch-android
 *
 * Should exist as `window.SquatchAndroid`
 */
export interface SquatchAndroid {
  /**
   *
   * @param shareLink
   * @param messageLink fallback URL to redirect to if the app is not installed
   */
  shareOnFacebook(shareLink: string, messageLink: string): void;

  /**
   * Shows a native Android toast
   *
   * @param text
   */
  showToast(text: string): void;
}

/**
 * An interface provided by Squatch.js V2 for widgets.
 *
 * See: https://github.com/saasquatch/squatch-js/blob/8f2b218c9d55567e0cc12d27d635a5fb545e6842/src/widgets/Widget.ts#L47
 *
 */
export interface SquatchJS2 {
  /**
   * Opens the current popup widget (if loaded as a popup)
   */
  open?: () => void;

  /**
   * Closes the current popup widget (if loaded as a popup)
   */
  close?: () => void;

  /**
   * DEPRECATED used to update user details from inside the widget.
   *
   * Should no longer be used. Replace with natively using the GraphQL API and re-rendering locally. Will be removed in a future version of Squatch.js
   *
   * @deprecated
   */
  reload(
    userDetails: { email: string; firstName: string; lastName: string },
    jwt: string
  ): void;
}

export type Environment = EnvironmentSDK["type"];

export type EnvironmentSDK =
  | {
      type: "SquatchJS2";
      api: SquatchJS2;
      widgetIdent: WidgetIdent;
    }
  | {
      type: "SquatchAndroid";
      android: SquatchAndroid;
      widgetIdent: WidgetIdent;
    }
  | {
      type: "SquatchPortal";
      env: PortalEnv;
    }
  | {
      type: "SquatchAdmin";
      adminSDK: SquatchAdmin;
    }
  | {
      type: "None";
    };

/**
 * Get the type of environment that this widget is being rendered in
 *
 * Should never return null.
 */
export function getEnvironment(): Environment {
  return getEnvironmentSDK().type;
}

/**
 * Get the SDK for interacting with the host environment
 */
export function getEnvironmentSDK(): EnvironmentSDK {
  //@ts-ignore
  if (window["SquatchAndroid"]) {
    return {
      type: "SquatchAndroid",
      //@ts-ignore
      android: window["SquatchAndroid"] as SquatchAndroid,
      //@ts-ignore
      widgetIdent: window["widgetIdent"],
    };
  }

  //@ts-ignore
  if (window["SquatchPortal"]) {
    return {
      type: "SquatchPortal",
      //@ts-ignore
      env: window["SquatchPortal"],
    };
  }

  //@ts-ignore
  if (window["SquatchAdmin"]) {
    return {
      type: "SquatchAdmin",
      //@ts-ignore
      adminSDK: window["SquatchAdmin"] as SquatchAdmin,
    };
  }

  if (window["widgetIdent"]) {
    return {
      type: "SquatchJS2",
      //@ts-ignore
      api: window.frameElement?.["squatchJsApi"],
      //@ts-ignore
      widgetIdent: window["widgetIdent"],
    };
  }

  return {
    type: "None",
  };
}

export function isDemo() {
  const sdk = getEnvironmentSDK();
  return sdk.type === "None" || sdk.type === "SquatchAdmin";
}

// Fake tenant alias in
const FAKE_TENANT = "demo";

export function useTenantAlias(): string {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchAndroid":
    case "SquatchJS2":
      return sdk.widgetIdent.tenantAlias;
    case "SquatchAdmin":
    case "None":
      return FAKE_TENANT;
    case "SquatchPortal":
      return sdk.env.tenantAlias;
  }
}

const DEFAULT_DOMAIN = "https://app.referralsaasquatch.com";
export function useAppDomain(): string {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchAndroid":
    case "SquatchJS2":
      return sdk.widgetIdent.appDomain;
    case "SquatchPortal":
      return sdk.env?.appDomain || DEFAULT_DOMAIN;
    case "SquatchAdmin":
    case "None":
      return DEFAULT_DOMAIN;
  }
}

const DEFAULT_PORTAL_AUTH_URL = "https://portal-auth.referralsaasquatch.com"; //todo: finalize
export function usePortalAuthUrl(): string {
  const sdk = getEnvironmentSDK();
  if (sdk.type === "SquatchPortal") {
    return sdk.env?.portalAuthUrl || DEFAULT_PORTAL_AUTH_URL;
  }
  return DEFAULT_PORTAL_AUTH_URL;
}

export type UserId = {
  id: string;
  accountId: string;
};

type EngagementMedium = "EMBED" | "POPUP";
const DEFAULT_MEDIUM = "EMBED";

export function useEngagementMedium(): EngagementMedium {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchJS2":
      return sdk.widgetIdent.engagementMedium || DEFAULT_MEDIUM;
    case "SquatchAndroid":
    case "SquatchPortal":
    case "SquatchAdmin":
    case "None":
      return DEFAULT_MEDIUM;
  }
}

export function useLocale(): string {
  // TODO: Widgets might provide this and portals might override this
  return getCleanLocale();
}

function getCleanLocale() {
  const locale = navigator.language;
  const splitLocale = locale?.split("-");
  if (!splitLocale || splitLocale.length === 1) return locale;
  const language = splitLocale[0];
  const country = splitLocale[1];
  return `${language}_${country.toUpperCase()}`;
}
