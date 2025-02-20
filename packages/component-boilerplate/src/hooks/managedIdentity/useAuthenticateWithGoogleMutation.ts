import gql from "graphql-tag";
import decode from "jwt-decode";

import { BaseQueryData } from "../graphql/useBaseQuery";
import { setUserIdentity, DecodedSquatchJWT } from "../environment";
import { useMutation } from "../graphql/useMutation";

const AuthenticateWithGoogleMutation = gql`
  mutation AuthenticateWithGoogle($idToken: String!) {
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

interface AuthenticateWithGoogleResult {
  authenticateManagedIdentityWithGoogle: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

export function useAuthenticateWithGoogleMutation(): [
  (variables: {
    idToken: string;
  }) => Promise<AuthenticateWithGoogleResult | Error>,
  BaseQueryData<AuthenticateWithGoogleResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<AuthenticateWithGoogleResult>(AuthenticateWithGoogleMutation);

  const requestAndSetUserIdentity = async (v: { idToken: string }) => {
    const result = await request(v);
    if (
      !(result instanceof Error) &&
      result.authenticateManagedIdentityWithGoogle
    ) {
      const jwt = result.authenticateManagedIdentityWithGoogle.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
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

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
