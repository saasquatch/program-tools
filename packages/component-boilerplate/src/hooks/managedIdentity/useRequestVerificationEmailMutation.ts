import gql from "graphql-tag";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";

const RequestVerificationEmailMutation = gql`
  mutation RequestVerificationEmail(
    $email: String!
    $urlParams: RSJsonNode
    $redirectPath: String
  ) {
    requestManagedIdentityVerificationEmail(
      requestManagedIdentityVerificationEmailInput: {
        email: $email
        urlParams: $urlParams
        redirectPath: $redirectPath
      }
    ) {
      success
    }
  }
`;

interface RequestVerificationEmailResult {
  requestManagedIdentityVerificationEmail: {
    success: boolean;
  };
}

export function useRequestVerificationEmailMutation(): [
  (variables: {
    email: string;
    urlParams?: Record<string, any>;
  }) => Promise<RequestVerificationEmailResult | Error>,
  BaseQueryData<RequestVerificationEmailResult>
] {
  return useMutation<RequestVerificationEmailResult>(
    RequestVerificationEmailMutation
  );
}
