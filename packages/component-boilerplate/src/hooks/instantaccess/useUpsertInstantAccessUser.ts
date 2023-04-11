import {
  DecodedSquatchJWT,
  setUserIdentity,
} from "@saasquatch/component-environment";
import gql from "graphql-tag";
import decode from "jwt-decode";
import { useMutation } from "../graphql/useMutation";
import { BaseQueryData } from "../graphql/useBaseQuery";
interface UpsertInstantAccessUserVariables {
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  countryCode: string;
  cookies: string;
}

interface UpsertInstantAccessUserResult {
  upsertInstantAccessUser: {
    token: string;
    user: {
      id: string;
      accountId: string;
    };
  };
}

const UpsertInstantAccessUserMutation = gql`
  mutation UpsertInstantAccessUser(
    $email: String!
    $firstName: String
    $lastName: String
    $locale: RSLocale
    $countryCode: RSCountryCode
    $cookies: String
  ) {
    upsertInstantAccessUser(
      instantAccessUserInput: {
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

export function useUpsertInstantAccessUserMutation(): [
  (e: unknown) => Promise<UpsertInstantAccessUserResult | Error>,
  BaseQueryData<UpsertInstantAccessUserResult>
] {
  const [request, { loading, data, errors }] =
    useMutation<UpsertInstantAccessUserResult>(UpsertInstantAccessUserMutation);

  const requestAndSetUserIdentity = async (
    variables: UpsertInstantAccessUserVariables
  ) => {
    const result = await request(variables);

    if (!(result instanceof Error) && result.upsertInstantAccessUser) {
      const jwt = result.upsertInstantAccessUser.token;
      setUserIdentity({
        jwt,
        id: result.upsertInstantAccessUser.user.id,
        accountId: result.upsertInstantAccessUser.user.accountId,
      });
    }

    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
