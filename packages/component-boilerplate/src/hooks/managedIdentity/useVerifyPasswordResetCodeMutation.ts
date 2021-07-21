import gql from "graphql-tag";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";

const VerifyPasswordResetCodeMutation = gql`
  mutation VerifyPasswordResetCode($oobCode: String!) {
    verifyManagedIdentityPasswordResetCode(
      verifyManagedIdentityPasswordResetCodeInput: { oobCode: $oobCode }
    ) {
      success
    }
  }
`;

interface VerifyPasswordResetCodeResult {
  verifyManagedIdentityPasswordResetCode: {
    success: boolean;
  };
}

export function useVerifyPasswordResetCodeMutation(): [
  (e: { oobCode: string }) => unknown,
  BaseQueryData<VerifyPasswordResetCodeResult>
] {
  return useMutation<VerifyPasswordResetCodeResult>(
    VerifyPasswordResetCodeMutation
  );
}
