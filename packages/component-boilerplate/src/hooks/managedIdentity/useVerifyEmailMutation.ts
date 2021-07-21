import gql from "graphql-tag";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import {
  setUserIdentity,
  useUserIdentity,
} from "../../environment/UserIdentityContext";
import { useMutation } from "../graphql/useMutation";

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
  const userIdentity = useUserIdentity();
  const [request, { loading, data, errors }] =
    useMutation<VerifyEmailResult>(VerifyEmailMutation);

  // TODO: This should refetch the managed identity from the identity service instead of deep-setting emailVerified
  useEffect(() => {
    if (data?.verifyManagedIdentityEmail?.success) {
      if (userIdentity) {
        setUserIdentity({
          ...userIdentity,
          managedIdentity: {
            ...userIdentity.managedIdentity,
            emailVerified: true,
          },
        });
      }
    }
  }, [data?.verifyManagedIdentityEmail?.success]);

  return [request, { loading, data, errors }];
}
