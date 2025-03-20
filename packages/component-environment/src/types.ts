import type { ContextProvider } from "dom-context";

declare global {
  interface Window {
    SquatchPortal?: PortalEnv;
    widgetIdent?: WidgetIdent;
    squatchUserIdentity?: ContextProvider<UserIdentity | undefined>;
    squatchLocale?: ContextProvider<string | undefined>;
    squatchProgramId?: ContextProvider<string | undefined>;
  }
}

export type UserContextName = "sq:user-identity";
export type LocaleContextName = "sq:locale";
export type ProgramContextName = "sq:program-id";

export const USER_CONTEXT_NAME: UserContextName = "sq:user-identity" as const;
export const LOCALE_CONTEXT_NAME: LocaleContextName = "sq:locale" as const;
export const PROGRAM_CONTEXT_NAME: ProgramContextName =
  "sq:program-id" as const;

/**
 * The value stored in the UserContext
 */
export type UserIdentity = {
  id: string;
  accountId: string;
  email?: string;
  jwt?: string;
  managedIdentity?: {
    email: string;
    emailVerified: boolean;
    sessionData?: { [key: string]: any };
  };
};

export type UserId = {
  id: string;
  accountId: string;
};

export interface DecodedSquatchJWT {
  exp?: number;
  user: {
    accountId: string;
    id: string;
    email?: string;
  };
}

// NOTE: Classic theme-engine JWT's do not have a typical payload,
// they have a sub in the form base64(accountId):base64(userId)@tenantAlias:users
export interface DecodedWidgetAPIJWT {
  exp?: number;
  sub: string;
}

export type EngagementMedium = "EMBED" | "POPUP";
export const DEFAULT_MEDIUM: EngagementMedium = "EMBED" as const;

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
  email?: string;
  locale?: string;
  engagementMedium?: "POPUP" | "EMBED";
  programId?: string;
  env?: string;
}

/**
 * Portal env doesn't include User Id
 * - googleClientId should be unique to SquatchPortal environments
 */
export type PortalEnv = Pick<
  WidgetIdent,
  "tenantAlias" | "appDomain" | "programId"
> & { googleClientId: string | undefined };

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
      type: "SquatchIOS";
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
