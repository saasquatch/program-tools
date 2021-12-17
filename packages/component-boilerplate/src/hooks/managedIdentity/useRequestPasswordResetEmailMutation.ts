import gql from "graphql-tag";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";

const RequestPasswordResetEmailMutation = gql`
  mutation RequestPasswordResetEmail(
    $email: String!
    $urlParams: RSJsonNode
    $redirectPath: String
  ) {
    requestManagedIdentityPasswordResetEmail(
      requestManagedIdentityPasswordResetEmailInput: {
        email: $email
        urlParams: $urlParams
        redirectPath: $redirectPath
      }
    ) {
      success
    }
  }
`;

interface RequestPasswordResetEmailResult {
  requestManagedIdentityPasswordResetEmail: {
    success: boolean;
  };
}

export function useRequestPasswordResetEmailMutation(): [
  (e: { email: string; urlParams?: Record<string, any> }) => unknown,
  BaseQueryData<RequestPasswordResetEmailResult>
] {
  return useMutation<RequestPasswordResetEmailResult>(
    RequestPasswordResetEmailMutation
  );
}
