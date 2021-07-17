import {
  GRAPHQL_CONTEXT,
  memoizedGraphQLClient,
  useTenantAlias,
  useToken,
} from "@saasquatch/component-boilerplate";
import { useDomContextState } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { GraphQLClient } from "graphql-request";

export async function usePortalManagedIdentityGraphQLClientProvider({
  domain,
}) {
  const token = useToken();
  const appDomain = domain;
  const tenantAlias = useTenantAlias();

  // Memoization is shared. One client per domain, tenant and token (or null)
  const managedIdentityClient: GraphQLClient = memoizedGraphQLClient(
    appDomain,
    tenantAlias,
    token
  );
  const [_client, setGraphQLClient] = useDomContextState<GraphQLClient>(
    GRAPHQL_CONTEXT,
    managedIdentityClient
  );

  useEffect(() => {
    setGraphQLClient(managedIdentityClient);
  }, [managedIdentityClient]);
}
