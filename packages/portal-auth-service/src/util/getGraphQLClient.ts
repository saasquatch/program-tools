import { GraphQLClient } from "graphql-request";
import config from "../config";

export const getGraphQLClient = (tenantAlias: string) => {
  const endpoint = `${
    config(tenantAlias).SQUATCH_BASE_URL
  }/api/v1/${tenantAlias}/graphql`;

  const headers = {
    Authorization: `Basic ${Buffer.from(
      `:${config(tenantAlias).SQUATCH_API_KEY}`
    ).toString("base64")}`,
  };
  return new GraphQLClient(endpoint, { headers });
};
