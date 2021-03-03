import { GraphQLClientContext } from "../../context";
import { GraphQLClient } from "graphql-request";
import { useHost } from "@saasquatch/stencil-hooks";

export function useGraphQLClient(): GraphQLClient {
  const client: GraphQLClient = GraphQLClientContext.useContext();
  const host = useHost();
  if (!client) {
    console.error(
      "No client! To call `useGraphQlClient` you must be inside a provider.",
      host
    );
  }
  return client;
}
