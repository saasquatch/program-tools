import memoize from "fast-memoize";
import { BatchedGraphQLClient } from "../../environment/BatchedGraphQLClient";
import {
  useAppDomain,
  useTenantAlias,
  useToken,
} from "../../environment/environment";
import { useDomContext } from "@saasquatch/dom-context-hooks";
import { useHost } from "../useHost";
import { GraphQLClient } from "graphql-request";

export const GRAPHQL_CONTEXT = "sq:graphql-client";

function createGraphQlClient(
  appDomain: string,
  tenantAlias: string,
  token?: string
): GraphQLClient {
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

function useGraphQLClient(): GraphQLClient {
  const token = useToken();
  const appDomain = useAppDomain();
  const tenantAlias = useTenantAlias();

  // Memoization is shared. One client per domain, tenant and token (or null)
  const localClient: GraphQLClient = memoizedGraphQLClient(
    appDomain,
    tenantAlias,
    token
  );
  const host = useHost();
  const clientFromContext = useDomContext<GraphQLClient>(
    host,
    GRAPHQL_CONTEXT,
    // Won't poll / re-attempt
    { attempts: 0 }
  );
  return clientFromContext ?? localClient;
}

export default useGraphQLClient;
