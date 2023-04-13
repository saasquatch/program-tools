import {
  DecodedSquatchJWT,
  setUserIdentity,
} from "@saasquatch/component-environment";
import gql from "graphql-tag";
import decode from "jwt-decode";
import { useMutation } from "../graphql/useMutation";
import { BaseQueryData } from "../graphql/useBaseQuery";
interface AuthenticateManagedIdentityWithInstantAccessVariables {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  countryCode: string;
  cookies: string;
}

interface AuthenticateManagedIdentityWithInstantAccessResult {
  authenticateManagedIdentityWithInstantAccess: {
    token: string;
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

const AuthenticateManagedIdentityWithInstantAccessMutation = gql`
  mutation authenticateManagedIdentityWithInstantAccess(
    $email: String!
    $firstName: String
    $lastName: String
    $locale: RSLocale
    $countryCode: RSCountryCode
    $cookies: String
  ) {
    authenticateManagedIdentityWithInstantAccess(
      authenticateManagedIdentityWithInstantAccessInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        locale: $locale
        countryCode: $countryCode
        cookies: $cookies
      }
    ) {
      email
      emailVerified
      sessionData
      token
    }
  }
`;

export function useAuthenticateManagedIdentityWithInstantAccess(): [
  (
    e: unknown
  ) => Promise<AuthenticateManagedIdentityWithInstantAccessResult | Error>,
  BaseQueryData<AuthenticateManagedIdentityWithInstantAccessResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<AuthenticateManagedIdentityWithInstantAccessResult>(
      AuthenticateManagedIdentityWithInstantAccessMutation
    );

  const requestAndSetUserIdentity = async (
    variables: AuthenticateManagedIdentityWithInstantAccessVariables
  ) => {
    const result = await request(variables);

    if (
      !(result instanceof Error) &&
      result.authenticateManagedIdentityWithInstantAccess
    ) {
      const jwt = result.authenticateManagedIdentityWithInstantAccess.token;
      const email = result.authenticateManagedIdentityWithInstantAccess.email;

      setUserIdentity({
        jwt,
        id: email,
        accountId: email,
      });
    }

    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
