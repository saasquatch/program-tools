import { GraphQLClient } from "graphql-request";
import { useMemo } from "@saasquatch/stencil-hooks";
import {
  useAppDomain,
  useTenantAlias,
  useToken,
} from "../../environment/environment";

export function useGraphQLClient(): GraphQLClient {
  const token = useToken();
  const appDomain = useAppDomain();
  const tenantAlias = useTenantAlias();
  const client: GraphQLClient = useMemo(() => {
    const uri = appDomain + "/api/v1/" + tenantAlias + "/graphql";
    const headers = {
      Authorization: `Bearer ${token || ""}`,
    };
    const newClient = new GraphQLClient(uri, {
      headers,
    });
    return newClient;
  }, [token, tenantAlias, appDomain]);
  return client;
}
