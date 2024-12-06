import { useDomContext } from "@saasquatch/dom-context-hooks";
import memoize from "fast-memoize";
import { BatchedGraphQLClient } from "../../BatchedGraphQLClient";
import { useAppDomain, useTenantAlias, useToken } from "../environment";
import { useHost } from "../useHost";
import { useQueryToken } from "../environment/useQueryToken";
import { useVerificationContext } from "../environment/useVerificationContext";

type Options = {
  protected?: boolean;
};

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

function useGraphQLClient(options?: Options): BatchedGraphQLClient {
  const token = useToken();
  const verifiedToken = useVerificationContext()?.token;
  const appDomain = useAppDomain();
  const tenantAlias = useTenantAlias();

  // Memoization is shared. One client per domain, tenant and token (or null)
  const localClient: BatchedGraphQLClient = memoizedGraphQLClient(
    appDomain,
    tenantAlias,
    options?.protected ? verifiedToken : token
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
