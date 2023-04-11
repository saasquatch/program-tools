import {
  Environment,
  EnvironmentSDK,
  EngagementMedium,
  DEFAULT_MEDIUM,
} from "./types";

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

  // Vanilla components mutates `widgetIdent` for portal, causing boilerplate to render as SquatchJS2
  if (
    (window.frameElement as any)?.["squatchJsApi"] &&
    window["widgetIdent"]?.env !== "demo"
  ) {
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

// Fake tenant alias in demo mode
const FAKE_TENANT = "demo";

export function getTenantAlias(): string {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchAndroid":
    case "SquatchIOS":
    case "SquatchJS2":
      return sdk.widgetIdent?.tenantAlias;
    case "SquatchAdmin":
    case "None":
      return FAKE_TENANT;
    case "SquatchPortal":
      return sdk.env.tenantAlias;
  }
}

const DEFAULT_DOMAIN = "https://app.referralsaasquatch.com";
export function getAppDomain(): string {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchAndroid":
    case "SquatchIOS":
    case "SquatchJS2":
      return sdk.widgetIdent?.appDomain || DEFAULT_DOMAIN;
    case "SquatchPortal":
      return sdk.env?.appDomain || DEFAULT_DOMAIN;
    case "SquatchAdmin":
    case "None":
      return DEFAULT_DOMAIN;
  }
}

export function getEngagementMedium(): EngagementMedium {
  const sdk = getEnvironmentSDK();
  switch (sdk.type) {
    case "SquatchJS2":
      return sdk.widgetIdent?.engagementMedium || DEFAULT_MEDIUM;
    case "SquatchAndroid":
    case "SquatchIOS":
    case "SquatchPortal":
    case "SquatchAdmin":
    case "None":
      return DEFAULT_MEDIUM;
  }
}
