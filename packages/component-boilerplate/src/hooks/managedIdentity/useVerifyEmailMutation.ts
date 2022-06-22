import gql from "graphql-tag";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";
import { useManagedIdentitySessionQuery } from "./useManagedIdentitySessionQuery";

const VerifyEmailMutation = gql`
  mutation VerifyEmail($oobCode: String!) {
    verifyManagedIdentityEmail(
      verifyManagedIdentityEmailInput: { oobCode: $oobCode }
    ) {
      success
    }
  }
`;

interface VerifyEmailResult {
  verifyManagedIdentityEmail: {
    success: boolean;
  };
}

export function useVerifyEmailMutation(): [
  (e: { oobCode: string }) => Promise<VerifyEmailResult | Error>,
  BaseQueryData<VerifyEmailResult>
] {
  const [refreshManagedIdentitySession] = useManagedIdentitySessionQuery();
  const [request, { loading, data, errors }] =
    useMutation<VerifyEmailResult>(VerifyEmailMutation);

  useEffect(() => {
    if (data?.verifyManagedIdentityEmail?.success) {
      refreshManagedIdentitySession();
    }
  }, [data?.verifyManagedIdentityEmail?.success]);

  return [request, { loading, data, errors }];
}
