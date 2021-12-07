import gql from "graphql-tag";
import decode from "jwt-decode";
import { useEffect } from "@saasquatch/universal-hooks";

import { BaseQueryData } from "../graphql/useBaseQuery";
import {
  setUserIdentity,
  DecodedSquatchJWT,
} from "../../environment/UserIdentityContext";
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
  (e: {
    email: string;
    password: string;
    formData?: Record<string, any>;
  }) => unknown,
  BaseQueryData<RegisterWithEmailAndPasswordResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<RegisterWithEmailAndPasswordResult>(
      RegisterWithEmailAndPasswordMutation
    );

  useEffect(() => {
    if (data?.registerManagedIdentityWithEmailAndPassword) {
      const { registerManagedIdentityWithEmailAndPassword: res } = data;
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
  }, [data?.registerManagedIdentityWithEmailAndPassword]);

  return [request, { loading, data, errors }];
}
