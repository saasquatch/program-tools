import {
  DecodedSquatchJWT,
  DecodedWidgetAPIJWT,
  setUserIdentity,
} from "@saasquatch/component-environment";
import gql from "graphql-tag";
import decode from "jwt-decode";
import { useMutation } from "../graphql/useMutation";

interface AuthenticateWithPasswordlessVariables {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  countryCode: string;
  cookies: string;
}

interface AuthenticateWithPasswordlessResult {
  authenticateManagedIdentityWithPasswordless: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

const AuthenticateWithPasswordlessMutation = gql`
  mutation AuthenticateWithEmail(
    $email: String!
    $firstName: String
    $lastName: String
    $locale: RSLocale
    $countryCode: RSCountryCode
    $cookies: String
  ) {
    authenticateManagedIdentityWithPasswordless(
      authenticateManagedIdentityWithPasswordlessInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        locale: $locale
        countryCode: $countryCode
        cookies: $cookies
      }
    ) {
      token
      email
      emailVerified
      sessionData
    }
  }
`;

export function useAuthenticateWithPasswordlessMutation() {
  const [request, { loading, data, errors }] =
    useMutation<AuthenticateWithPasswordlessResult>(
      AuthenticateWithPasswordlessMutation
    );

  const requestAndSetUserIdentity = async (
    variables: AuthenticateWithPasswordlessVariables
  ) => {
    const result = await request(variables);

    if (
      !(result instanceof Error) &&
      result.authenticateManagedIdentityWithPasswordless
    ) {
      const jwt = result.authenticateManagedIdentityWithPasswordless.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        managedIdentity: {
          email: result.authenticateManagedIdentityWithPasswordless.email,
          emailVerified:
            result.authenticateManagedIdentityWithPasswordless.emailVerified,
          sessionData:
            result.authenticateManagedIdentityWithPasswordless.sessionData,
        },
      });
    }

    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
