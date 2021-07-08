import { gql } from "graphql-request";
import { getGraphQLClient } from "./getGraphQLClient";

interface SquatchIdentity {
  tenantAlias: string;
  id: string;
  accountId: string;
}

export const queueEmail = async (
  user: SquatchIdentity,
  key: string,
  validateLinkString?: string
) => {
  const { id, accountId, tenantAlias } = user;
  const variables = { validateLinkString, id, accountId, key };
  const mutation = gql`
    mutation validateEmail(
      $validateLinkString: String!
      $id: String!
      $accountId: String!
      $key: String!
    ) {
      queueGlobalEmail(
        queueGlobalEmailInput: {
          key: $key
          user: { id: $id, accountId: $accountId }
          contextGraphQLRequest: {
            variables: { validationLink: $validateLinkString }
            query: "query foo($validationLink: RSJsonNode!) { validationLink: identityFunction(value: $validationLink) }"
          }
        }
      ) {
        contextGraphQLRequest {
          variables
        }
      }
    }
  `;
  const client = getGraphQLClient(tenantAlias);

  await client.request(mutation, variables);
};
