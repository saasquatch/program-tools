import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { setUserIdentity, DecodedSquatchJWT } from "../environment";
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
  (variables: {
    oobCode: string;
    password: string;
  }) => Promise<ResetPasswordResult | Error>,
  BaseQueryData<ResetPasswordResult>
] {
  const [request, { loading, data, errors }] = useMutation<ResetPasswordResult>(
    ResetPasswordMutation
  );

  const requestAndSetUserIdentity = async (v: {
    oobCode: string;
    password: string;
  }) => {
    const result = await request(v);
    if (!(result instanceof Error) && result.resetManagedIdentityPassword) {
      const jwt = result.resetManagedIdentityPassword.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: result.resetManagedIdentityPassword.email,
          emailVerified: result.resetManagedIdentityPassword.emailVerified,
          sessionData: result.resetManagedIdentityPassword.sessionData,
        },
      });
    }
    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
