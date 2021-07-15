// import { GraphQLClient } from "graphql-request";
// import memoize from "fast-memoize";
// import { useTenantAlias } from "@saasquatch/component-boilerplate";

// function createGraphQlClient(
//   portalDomain: string,
//   tenantAlias: string,
//   token?: string
// ): GraphQLClient {
//   const uri = portalDomain + "/tenant/" + tenantAlias + "/graphql";
//   const newClient = new GraphQLClient(uri,
//   });
//   return newClient;
// }

// const memoizedClient = memoize(createGraphQlClient);

// export function usePortalGraphQLClient(): GraphQLClient {
//   const portalDomain = "http://localhost:4000"; //usePortalDomain();
//   const tenantAlias = useTenantAlias();

//   // Memoization is shared. One client per domain, tenant
//   const client: GraphQLClient = memoizedClient(portalDomain, tenantAlias);

//   return client;
// }
