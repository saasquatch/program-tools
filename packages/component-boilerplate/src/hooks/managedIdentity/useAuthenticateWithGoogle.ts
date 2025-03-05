import { gql } from "graphql-request";
import { BaseQueryData } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";
import jwtDecode from "jwt-decode";
import {
  DecodedSquatchJWT,
  setUserIdentity,
} from "@saasquatch/component-environment";

const AuthenticateWithGoogleMutation = gql`
  mutation authenticateManagedIdentityWithGoogle($idToken: String!) {
    authenticateManagedIdentityWithGoogle(
      authenticateManagedIdentityWithGoogleInput: { idToken: $idToken }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

interface AuthenticateWithGoogle {
  authenticateManagedIdentityWithGoogle: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

export function useAuthenticateWithGoogle(): [
  (variables: { idToken: string }) => Promise<AuthenticateWithGoogle | Error>,
  BaseQueryData<AuthenticateWithGoogle>
] {
  const [request, { loading, data, errors }] =
    useMutation<AuthenticateWithGoogle>(AuthenticateWithGoogleMutation);

  const updateUserIdentity = async (v: { idToken: string }) => {
    const result = await request(v);
    if (
      !(result instanceof Error) &&
      result.authenticateManagedIdentityWithGoogle
    ) {
      const jwt = result.authenticateManagedIdentityWithGoogle.token;
      const { user } = jwtDecode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: result.authenticateManagedIdentityWithGoogle.email,
          emailVerified:
            result.authenticateManagedIdentityWithGoogle.emailVerified,
          sessionData: result.authenticateManagedIdentityWithGoogle.sessionData,
        },
      });
    }

    return result;
  };

  return [updateUserIdentity, { loading, data, errors }];
}
