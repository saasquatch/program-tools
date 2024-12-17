import {
  getTenantAlias,
  getAppDomain,
  getEngagementMedium,
} from "@saasquatch/component-environment";

// Aliases to function in component-environment to maintain a backwards-compatible API
export const useTenantAlias = getTenantAlias;
export const useAppDomain = getAppDomain;
export const useEngagementMedium = getEngagementMedium;

export {
  getEnvironmentSDK,
  setUserIdentity,
  setVerificationContext,
  setProgramId,
  isDemo,
  DecodedSquatchJWT,
} from "@saasquatch/component-environment";

export * from "./useLocale";
export * from "./useProgramId";
export * from "./useUserIdentity";
export * from "./useVerificationContext";
