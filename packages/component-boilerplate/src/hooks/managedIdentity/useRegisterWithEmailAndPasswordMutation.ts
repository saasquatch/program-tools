import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { setUserIdentity, DecodedSquatchJWT } from "../environment";
import { useMutation } from "../graphql/useMutation";

const RegisterWithEmailAndPasswordMutation = gql`
  mutation RegisterWithEmailAndPassword(
    $email: String!
    $password: String!
    $formData: RSJsonNode
    $redirectPath: String
  ) {
    registerManagedIdentityWithEmailAndPassword(
      registerManagedIdentityWithEmailAndPasswordInput: {
        email: $email
        password: $password
        formData: $formData
        redirectPath: $redirectPath
      }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

interface RegisterWithEmailAndPasswordResult {
  registerManagedIdentityWithEmailAndPassword: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

export function useRegisterWithEmailAndPasswordMutation(): [
  (variables: {
    email: string;
    password: string;
    formData?: Record<string, any>;
  }) => Promise<RegisterWithEmailAndPasswordResult | Error>,
  BaseQueryData<RegisterWithEmailAndPasswordResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<RegisterWithEmailAndPasswordResult>(
      RegisterWithEmailAndPasswordMutation
    );

  const requestAndSetUserIdentity = async (v: {
    email: string;
    password: string;
    formData?: Record<string, any>;
  }) => {
    const result = await request(v);
    if (
      !(result instanceof Error) &&
      result.registerManagedIdentityWithEmailAndPassword
    ) {
      const jwt = result.registerManagedIdentityWithEmailAndPassword.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: result.registerManagedIdentityWithEmailAndPassword.email,
          emailVerified:
            result.registerManagedIdentityWithEmailAndPassword.emailVerified,
          sessionData:
            result.registerManagedIdentityWithEmailAndPassword.sessionData,
        },
      });
    }
    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
