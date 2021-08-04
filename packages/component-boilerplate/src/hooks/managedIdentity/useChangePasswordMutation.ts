import gql from "graphql-tag";
import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";

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
  (e: { password: string }) => unknown,
  BaseQueryData<ChangePasswordResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<ChangePasswordResult>(ChangePasswordMutation);

  return [request, { loading, data, errors }];
}
