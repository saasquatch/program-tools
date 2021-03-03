import { WidgetIdent } from "./shared";
import { SquatchAdmin } from "./SquatchAdmin";
import { SquatchAndroid } from "./SquatchAndroid";
import { SquatchJS2 } from "./SquatchJS2";
import { SquatchPortal, SquatchPortalInstance } from "./SquatchPortal";

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
  if (sdk.type === "SquatchAndroid" || sdk.type === "SquatchJS2") {
    return {
      id: sdk.widgetIdent.userId,
      accountId: sdk.widgetIdent.accountId,
      jwt: sdk.widgetIdent.token,
    };
  }

  if (sdk.type === "SquatchPortal") {
    return sdk.context.userContext.useContext();
  }
  // No widget ident in the Admin portal / demo mode
  return undefined;
}

export function useTenantAlias(): string {
  return "TODO";
}

export function useAppDomain(): string {
  return "staging.referralsaasquatch.com";
}

export function useToken(): string | undefined {
  return "TODO";
}

export type UserId = {
  id: string;
  accountId: string;
};

export function useUserId(): UserId | undefined {
  return {
    id: "TODO",
    accountId: "TODO",
  };
}

export function useEngagementMedium(): string {
  return "TODO";
}

export function useProgramId(): string | undefined {
  return undefined;
}
