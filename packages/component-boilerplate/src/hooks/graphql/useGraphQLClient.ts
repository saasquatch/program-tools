import { useDomContext } from "@saasquatch/dom-context-hooks";
import memoizeModule from "fast-memoize";
import { BatchedGraphQLClient } from "../../BatchedGraphQLClient.ts";
import { useAppDomain, useTenantAlias, useToken } from "../environment/index.ts";
import { useHost } from "../useHost.ts";
import { GRAPHQL_CONTEXT } from "./context.ts";

// fast-memoize is CommonJS (`module.exports = memoize`) but its types declare
// `export default`, so under ESM TypeScript types the import as the exports object.
const memoize: typeof memoizeModule.default =
  (memoizeModule as any).default ?? memoizeModule;

export { GRAPHQL_CONTEXT };

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
