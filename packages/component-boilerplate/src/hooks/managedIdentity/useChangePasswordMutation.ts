import { gql } from "graphql-tag";
import type { BaseQueryData } from "../graphql/useBaseQuery.ts";
import { useMutation } from "../graphql/useMutation.ts";

const ChangePasswordMutation = gql`
  mutation ChangePassword($password: String!) {
    changeManagedIdentityPassword(
      changeManagedIdentityPasswordInput: { password: $password }
    ) {
      success
    }
  }
`;

interface ChangePasswordResult {
  changeManagedIdentityPassword: {
    success: boolean;
  };
}

export function useChangePasswordMutation(): [
  (variables: { password: string }) => Promise<ChangePasswordResult | Error>,
  BaseQueryData<ChangePasswordResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<ChangePasswordResult>(ChangePasswordMutation);

  return [request, { loading, data, errors }];
}
