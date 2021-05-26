import memoize from "fast-memoize";
import { BatchedGraphQLClient } from "../../environment/BatchedGraphQLClient";
import {
  useAppDomain,
  useTenantAlias,
  useToken,
} from "../../environment/environment";

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

const memoizedClient = memoize(createGraphQlClient);

function useGraphQLClient(): BatchedGraphQLClient {
  const token = useToken();
  const appDomain = useAppDomain();
  const tenantAlias = useTenantAlias();

  // Memoization is shared. One client per domain, tenant and token (or null)
  const client: BatchedGraphQLClient = memoizedClient(
    appDomain,
    tenantAlias,
    token
  );
  return client;
}

export default useGraphQLClient;
