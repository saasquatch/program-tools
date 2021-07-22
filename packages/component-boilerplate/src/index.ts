/**
 * Identity and environment
 */
export {
  /*
   * Identity
   */
  useUserIdentity,
  setUserIdentity,
  useToken,
  /*
   * Core environment
   */
  getEnvironmentSDK,
  useTenantAlias,
  useProgramId,
  setProgramId,
  useAppDomain,
  usePortalAuthUrl,
  isDemo,
  /*
   * Personalization environment
   */
  useEngagementMedium,
  useLocale,
} from "./environment";
export { useAuthenticateWithEmailAndPasswordMutation } from "./hooks/managedIdentity/useAuthenticateWithEmailAndPasswordMutation";
export { useRegisterWithEmailAndPasswordMutation } from "./hooks/managedIdentity/useRegisterWithEmailAndPasswordMutation";
export { useResetPasswordMutation } from "./hooks/managedIdentity/useResetPasswordMutation";
export { useVerifyPasswordResetCodeMutation } from "./hooks/managedIdentity/useVerifyPasswordResetCodeMutation";
export { useVerifyEmailMutation } from "./hooks/managedIdentity/useVerifyEmailMutation";
export { useRequestPasswordResetEmailMutation } from "./hooks/managedIdentity/useRequestPasswordResetEmailMutation";
export { useRequestVerificationEmailMutation } from "./hooks/managedIdentity/useRequestVerificationEmailMutation";
export { useManagedIdentityQuery } from "./hooks/managedIdentity/useManagedIdentityQuery";

//
//      GraphQL API
//
export { BatchedGraphQLClient } from "./environment/BatchedGraphQLClient";
export { useQuery } from "./hooks/graphql/useQuery";
export { useMutation } from "./hooks/graphql/useMutation";
export { useLazyQuery } from "./hooks/graphql/useLazyQuery";
export {
  memoizedGraphQLClient,
  GRAPHQL_CONTEXT,
} from "./hooks/graphql/useGraphQLClient";

//      Navigation

export { navigation, useCurrentPage } from "./hooks/useNavigation";

//
//      Pagination
//
export { usePagination } from "./hooks/pagination/usePagination";
export { usePaginatedQuery } from "./hooks/pagination/usePaginatedQuery";

//
//      Generic low-level helpers
//
export { useDebounce, useDebouncedCallback } from "./hooks/useDebounce";
export { useTick } from "./hooks/useTick";
export {
  useHost,
  setImplementation as setUseHostImplementation,
} from "./hooks/useHost";

//
//      Common higher-level functionality
//
export { useShareEvent } from "./hooks/useShareEvent";
export { useForm } from "./hooks/useForm";
