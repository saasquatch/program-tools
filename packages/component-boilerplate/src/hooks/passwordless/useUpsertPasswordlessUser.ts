import {
  DecodedSquatchJWT,
  setUserIdentity,
} from "@saasquatch/component-environment";
import gql from "graphql-tag";
import decode from "jwt-decode";
import { useMutation } from "../graphql/useMutation";

interface UpsertPasswordlessUserVariables {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  countryCode: string;
  cookies: string;
}

interface UpsertPasswordlessUserResult {
  upsertPasswordlessUser: {
    token: string;
    user: {
      id: string;
      accountId: string;
    };
  };
}

const UpsertPasswordlessUserMutation = gql`
  mutation UpsertPasswordlessUser(
    $email: String!
    $firstName: String
    $lastName: String
    $locale: RSLocale
    $countryCode: RSCountryCode
    $cookies: String
  ) {
    upsertPasswordlessUser(
      passwordlessUserInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        locale: $locale
        countryCode: $countryCode
        cookies: $cookies
      }
    ) {
      user {
        id
        accountId
      }
      token
    }
  }
`;

export function useUpsertPasswordlessUserMutation() {
  const [request, { loading, data, errors }] =
    useMutation<UpsertPasswordlessUserResult>(UpsertPasswordlessUserMutation);

  const requestAndSetUserIdentity = async (
    variables: UpsertPasswordlessUserVariables
  ) => {
    const result = await request(variables);

    if (!(result instanceof Error) && result.upsertPasswordlessUser) {
      const jwt = result.upsertPasswordlessUser.token;
      const { user } = decode<DecodedSquatchJWT>(jwt);
      setUserIdentity({
        jwt,
        id: user.id,
        accountId: user.accountId,
        // managedIdentity: {
        //   email: result.upsertPasswordlessUser.email,
        //   emailVerified: result.upsertPasswordlessUser.emailVerified,
        //   sessionData: result.upsertPasswordlessUser.sessionData,
        // },
      });
    }

    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
