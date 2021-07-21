import gql from "graphql-tag";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";

const RequestVerificationEmailMutation = gql`
  mutation RequestVerificationEmail($email: String!, $urlParams: RSJsonNode) {
    requestManagedIdentityVerificationEmail(
      requestManagedIdentityVerificationEmailInput: {
        email: $email
        urlParams: $urlParams
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
  (e: { email: string; urlParams?: Record<string, any> }) => unknown,
  BaseQueryData<RequestVerificationEmailResult>
] {
  return useMutation<RequestVerificationEmailResult>(
    RequestVerificationEmailMutation
  );
}
