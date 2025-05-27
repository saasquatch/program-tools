import { useDomContext } from "@saasquatch/dom-context-hooks";
import memoize from "fast-memoize";
import { BatchedGraphQLClient } from "../../BatchedGraphQLClient";
import { useAppDomain, useTenantAlias, useToken } from "../environment";
import { useHost } from "../useHost";

export const GRAPHQL_CONTEXT = "sq:graphql-client";

function createGraphQlClient(
  appDomain: string,
  tenantAlias: string,
  token?: string
): BatchedGraphQLClient {
  const uri = appDomain + "/api/v1/" + tenantAlias + "/graphql";
  const headers = {
    Authorization: `Bearer ${token || ""}`,
  };
  const newClient = new BatchedGraphQLClient(uri, {
    headers,
  });
  return newClient;
}

export const memoizedGraphQLClient = memoize(createGraphQlClient);

function useGraphQLClient(): BatchedGraphQLClient {
  const token = useToken();
  const appDomain = useAppDomain();
  const tenantAlias = useTenantAlias();

  // Memoization is shared. One client per domain, tenant and token (or null)
  const localClient: BatchedGraphQLClient = memoizedGraphQLClient(
    appDomain,
    tenantAlias,
    token
  );
  const host = useHost();
  const clientFromContext = useDomContext<BatchedGraphQLClient>(
    host,
    GRAPHQL_CONTEXT,
    // Won't poll / re-attempt
    { attempts: 0 }
  );
  return clientFromContext ?? localClient;
}

export default useGraphQLClient;
