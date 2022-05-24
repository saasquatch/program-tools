import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import {
  setUserIdentity,
  DecodedSquatchJWT,
} from "../../environment/UserIdentityContext";
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
  (e: { email: string; password: string }) => unknown,
  BaseQueryData<AuthenticateWithEmailAndPasswordResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<AuthenticateWithEmailAndPasswordResult>(
      AuthenticateWithEmailAndPasswordMutation
    );

  useEffect(() => {
    if (data?.authenticateManagedIdentityWithEmailAndPassword) {
      const { authenticateManagedIdentityWithEmailAndPassword: res } = data;
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
  }, [data?.authenticateManagedIdentityWithEmailAndPassword]);

  return [request, { loading, data, errors }];
}
