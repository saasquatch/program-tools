/**
 * Identity and environment
 */
export {
  useUserIdentity,
  useTenantAlias,
  useProgramId,
  useEngagementMedium,
  useAppDomain,
  useToken,
  useLocale,
} from "./environment/environment";

//
//      GraphQL API
//
export { useQuery } from "./hooks/graphql/useQuery";
export { useMutation } from "./hooks/graphql/useMutation";
export { useLazyQuery } from "./hooks/graphql/useLazyQuery";

//
//      Generic low-level helpers
//
export { useDebounce, useDebouncedCallback } from "./hooks/useDebounce";
export { useTick } from "./hooks/useTick";
export { useHost, setImplementation as setUseHostImplementation } from "./hooks/useHost";

//
//      Common higher-level functionality
//
export { useShareEvent } from "./hooks/useShareEvent";
export { useForm } from "./hooks/useForm";
