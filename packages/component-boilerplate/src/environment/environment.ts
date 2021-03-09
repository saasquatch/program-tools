import { useHost } from "../hooks/useHost";
import { useProgramContext } from "./ProgramContext";
import {
  PortalEnv,
  SquatchPortal,
  SquatchPortalInstance,
} from "./SquatchPortal";

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
      context: SquatchPortal;
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
  if (window.frameElement && (window.frameElement as any)["squatchJsApi"]) {
    return {
      type: "SquatchJS2",
      //@ts-ignore
      api: window.frameElement["squatchJsApi"],
      //@ts-ignore
      widgetIdent: window["widgetIdent"],
    };
  }

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

  // TODO: Needs formalizing
  //@ts-ignore
  if (window["SquatchPortal"]) {
    return {
      type: "SquatchPortal",
      context: SquatchPortalInstance,
      //@ts-ignore
      env: window["SquatchPortal"],
    };
  }

  // TODO: Needs formalizing
  //@ts-ignore
  if (window["SquatchAdmin"]) {
    return {
      type: "SquatchAdmin",
      //@ts-ignore
      adminSDK: window["SquatchAdmin"] as SquatchAdmin,
    };
  }

  return {
    type: "None",
  };
}

type UserIdentity = {
  id: string;
  accountId: string;
  jwt?: string;
};

export function useUserIdentity(): UserIdentity | undefined {
  const sdk = getEnvironmentSDK();
  const host = useHost();
  switch (sdk.type) {
    case "SquatchAndroid":
    case "SquatchJS2":
      return {
        id: sdk.widgetIdent.userId,
        accountId: sdk.widgetIdent.accountId,
        jwt: sdk.widgetIdent.token,
      };
    case "SquatchPortal":
      return sdk.context.userContext.useContext(host);
    case "SquatchAdmin":
    case "None":
      // Not logged in for admin portal / none default case
      return undefined;
  }
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

export function useToken(): string | undefined {
  return useUserIdentity()?.jwt;
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

export function useProgramId(): string | undefined {
  // TODO: Widgets MIGHT have program ID available at the top level via widget ident
  return useProgramContext();
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
  return `${language}-${country.toUpperCase()}`;
}
