import gql from "graphql-tag";

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

  const requestAndRefreshManagedIdentitySession = async (e: {
    oobCode: string;
  }) => {
    const result = await request(e);
    if (
      !(result instanceof Error) &&
      result?.verifyManagedIdentityEmail?.success
    ) {
      await refreshManagedIdentitySession();
    }
    return result;
  };

  return [requestAndRefreshManagedIdentitySession, { loading, data, errors }];
}
