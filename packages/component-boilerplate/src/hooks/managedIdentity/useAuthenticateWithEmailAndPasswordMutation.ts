import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { setUserIdentity, DecodedSquatchJWT } from "../environment";
import { useMutation } from "../graphql/useMutation";

const AuthenticateWithEmailAndPasswordMutation = gql`
  mutation AuthenticateWithEmailAndPassword(
    $email: String!
    $password: String!
  ) {
    authenticateManagedIdentityWithEmailAndPassword(
      authenticateManagedIdentityWithEmailAndPasswordInput: {
        email: $email
        password: $password
      }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

interface AuthenticateWithEmailAndPasswordResult {
  authenticateManagedIdentityWithEmailAndPassword: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

export function useAuthenticateWithEmailAndPasswordMutation(): [
  (variables: {
    email: string;
    password: string;
  }) => Promise<AuthenticateWithEmailAndPasswordResult | Error>,
  BaseQueryData<AuthenticateWithEmailAndPasswordResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<AuthenticateWithEmailAndPasswordResult>(
      AuthenticateWithEmailAndPasswordMutation
    );

  const requestAndSetUserIdentity = async (v: {
    email: string;
    password: string;
  }) => {
    const result = await request(v);
    if (
      !(result instanceof Error) &&
      result.authenticateManagedIdentityWithEmailAndPassword
    ) {
      const jwt = result.authenticateManagedIdentityWithEmailAndPassword.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: result.authenticateManagedIdentityWithEmailAndPassword.email,
          emailVerified:
            result.authenticateManagedIdentityWithEmailAndPassword
              .emailVerified,
          sessionData:
            result.authenticateManagedIdentityWithEmailAndPassword.sessionData,
        },
      });
    }
    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
