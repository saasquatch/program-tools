import {
  GRAPHQL_CONTEXT,
  useTenantAlias,
  useToken,
} from "@saasquatch/component-boilerplate";
import { useDomContextState } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { GraphQLClient } from "graphql-request";
import { GraphQLClientProvider } from "./sqp-graphql-client-provider";
import { memoizedGraphQLClient } from "./useGraphQLClient";

export async function useGraphQLClientProvider({
  domain,
}: GraphQLClientProvider) {
  const token = useToken();
  const appDomain = domain;
  const tenantAlias = useTenantAlias();

  // Memoization is shared. One client per domain, tenant and token (or null)
  const managedIdentityClient: GraphQLClient = memoizedGraphQLClient(
    appDomain,
    tenantAlias,
    token
  );
  const [, setGraphQLClient] = useDomContextState<GraphQLClient>(
    GRAPHQL_CONTEXT,
    managedIdentityClient
  );

  useEffect(() => {
    setGraphQLClient(managedIdentityClient);
  }, [managedIdentityClient]);
}
