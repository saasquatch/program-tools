import gql from "graphql-tag";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";
import { useManagedIdentityQuery } from "./useManagedIdentityQuery";

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
  (e: { oobCode: string }) => unknown,
  BaseQueryData<VerifyEmailResult>
] {
  const [refreshManagedIdentity] = useManagedIdentityQuery();
  const [request, { loading, data, errors }] =
    useMutation<VerifyEmailResult>(VerifyEmailMutation);

  useEffect(() => {
    if (data?.verifyManagedIdentityEmail?.success) {
      refreshManagedIdentity();
    }
  }, [data?.verifyManagedIdentityEmail?.success]);

  return [request, { loading, data, errors }];
}
