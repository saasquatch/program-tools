//
//      Identity and environment
//
export * from "./hooks/environment/index.ts";

//
//      Managed Identity
//
export { useAuthenticateWithEmailAndPasswordMutation } from "./hooks/managedIdentity/useAuthenticateWithEmailAndPasswordMutation.ts";
export { useRegisterWithEmailAndPasswordMutation } from "./hooks/managedIdentity/useRegisterWithEmailAndPasswordMutation.ts";
export { useRegisterViaRegistrationFormMutation } from "./hooks/managedIdentity/useRegisterViaRegistrationFormMutation.ts";
export { useChangePasswordMutation } from "./hooks/managedIdentity/useChangePasswordMutation.ts";
export { useResetPasswordMutation } from "./hooks/managedIdentity/useResetPasswordMutation.ts";
export { useVerifyPasswordResetCodeMutation } from "./hooks/managedIdentity/useVerifyPasswordResetCodeMutation.ts";
export { useVerifyEmailMutation } from "./hooks/managedIdentity/useVerifyEmailMutation.ts";
export { useRequestPasswordResetEmailMutation } from "./hooks/managedIdentity/useRequestPasswordResetEmailMutation.ts";
export { useRequestVerificationEmailMutation } from "./hooks/managedIdentity/useRequestVerificationEmailMutation.ts";
export { useManagedIdentitySessionQuery } from "./hooks/managedIdentity/useManagedIdentitySessionQuery.ts";
export { useAuthenticateManagedIdentityWithInstantAccess } from "./hooks/instantaccess/useAuthenticateManagedIdentityWithInstantAccess.ts";
export { useAuthenticateWithGoogle } from "./hooks/managedIdentity/useAuthenticateWithGoogle.ts";

//
//      GraphQL API
//
export { BatchedGraphQLClient } from "./BatchedGraphQLClient.ts";
export { fakeJwt } from "./fakeJwt.ts";
export { useQuery } from "./hooks/graphql/useQuery.ts";
export { useMutation } from "./hooks/graphql/useMutation.ts";
export { useLazyQuery } from "./hooks/graphql/useLazyQuery.ts";
export {
  memoizedGraphQLClient,
  GRAPHQL_CONTEXT,
} from "./hooks/graphql/useGraphQLClient.ts";
export { useRefreshDispatcher } from "./hooks/graphql/Refresh.ts";
export {
  useParentQuery,
  useParentQueryValue,
} from "./hooks/graphql/useParentQuery.ts";

//      Navigation
export { navigation, useCurrentPage } from "./hooks/useNavigation.ts";

//
//      Pagination
//
export { usePagination } from "./hooks/pagination/usePagination.ts";
export { usePaginatedQuery } from "./hooks/pagination/usePaginatedQuery.ts";

//
//      Generic low-level helpers
//
export { useDebounce, useDebouncedCallback } from "./hooks/useDebounce.ts";
export { useTick } from "./hooks/useTick.ts";
export {
  useHost,
  setImplementation as setUseHostImplementation,
} from "./hooks/useHost.ts";
export {
  useParentState,
  useParent,
  useParentValue,
  useSetParent,
  getContextName,
  getContextValueName,
} from "./hooks/useParentState.ts";

//
//      Common higher-level functionality
//
export { useShareEvent } from "./hooks/useShareEvent.ts";
export { useLoadEvent } from "./hooks/useLoadEvent.ts";
export { useForm } from "./hooks/useForm.ts";
