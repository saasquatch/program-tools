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
} from "./environment/environment";

//
//      GraphQL API
//
export { useQuery } from "./hooks/graphql/useQuery";
export { useMutation } from "./hooks/graphql/useMutation";
export { useLazyQuery } from "./hooks/graphql/useLazyQuery";
export { customQueryHooksFactory } from "./hooks/graphql/useCustomQuery";

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
