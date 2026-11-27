import { gql } from "graphql-tag";

import type { BaseQueryData } from "../graphql/useBaseQuery.ts";
import { useMutation } from "../graphql/useMutation.ts";

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
  (variables: {
    oobCode: string;
  }) => Promise<VerifyPasswordResetCodeResult | Error>,
  BaseQueryData<VerifyPasswordResetCodeResult>
] {
  return useMutation<VerifyPasswordResetCodeResult>(
    VerifyPasswordResetCodeMutation
  );
}
