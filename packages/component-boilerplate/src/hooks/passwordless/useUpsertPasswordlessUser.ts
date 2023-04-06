import {
  DecodedSquatchJWT,
  setUserIdentity,
} from "@saasquatch/component-environment";
import gql from "graphql-tag";
import decode from "jwt-decode";
import { useMutation } from "../graphql/useMutation";
import { BaseQueryData } from "../graphql/useBaseQuery";
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

export function useUpsertPasswordlessUserMutation(): [
  (e: unknown) => Promise<UpsertPasswordlessUserResult | Error>,
  BaseQueryData<UpsertPasswordlessUserResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<UpsertPasswordlessUserResult>(UpsertPasswordlessUserMutation);

  const requestAndSetUserIdentity = async (
    variables: UpsertPasswordlessUserVariables
  ) => {
    const result = await request(variables);

    if (!(result instanceof Error) && result.upsertPasswordlessUser) {
      const jwt = result.upsertPasswordlessUser.token;
      setUserIdentity({
        jwt,
        id: result.upsertPasswordlessUser.user.id,
        accountId: result.upsertPasswordlessUser.user.accountId,
      });
    }

    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
