import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import {
  setUserIdentity,
  DecodedSquatchJWT,
} from "../../environment/UserIdentityContext";
import { useMutation } from "../graphql/useMutation";

const ResetPasswordMutation = gql`
  mutation ResetPassword($oobCode: String!, $password: String!) {
    resetManagedIdentityPassword(
      resetManagedIdentityPasswordInput: {
        password: $password
        oobCode: $oobCode
      }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

interface ResetPasswordResult {
  resetManagedIdentityPassword: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

export function useResetPasswordMutation(): [
  (e: { oobCode: string; password: string }) => unknown,
  BaseQueryData<ResetPasswordResult>
] {
  const [request, { loading, data, errors }] = useMutation<ResetPasswordResult>(
    ResetPasswordMutation
  );

  useEffect(() => {
    if (data?.resetManagedIdentityPassword) {
      const { resetManagedIdentityPassword: res } = data;
      const jwt = res.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: res.email,
          emailVerified: res.emailVerified,
          sessionData: res.sessionData,
        },
      });
    }
  }, [data?.resetManagedIdentityPassword]);

  return [request, { loading, data, errors }];
}
