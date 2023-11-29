import {
  getAppDomain,
  getTenantAlias,
  getUserIdentity,
  setUserIdentity,
} from "@saasquatch/component-environment";
import gql from "graphql-tag";
import { BaseQueryData, useBaseQuery } from "../graphql/useBaseQuery";
import { useMutation } from "../graphql/useMutation";
import { useProgramId } from "../environment";

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

const CheckReferralFraudStatusQuery = `
  query checkReferralFraudStatus($programId: ID) {
    viewer {
      ... on User {
        id
        instantAccessRewards(filter: { programId_eq: $programId }) {
          data {
            id
            pendingReasons
            cancelledReason
          }
        }
      }
    }
  }
`;

async function fetchFraud(programId: string, jwt: string) {
  try {
    const result = await fetch(
      `${getAppDomain()}/api/v1/${getTenantAlias()}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          query: CheckReferralFraudStatusQuery,
          variables: {
            programId,
          },
        }),
      }
    );

    if (!result.ok) {
      throw new Error("Failed to fetch locale");
    }

    const json = await result.json();
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors, null, 2));
    }

    const results = (json as any).data.viewer.instantAccessRewards?.data || [];
    if (results.some((r) => r.cancelledReason === "SUSPECTED_FRAUD"))
      return "DENIED";
    else if (results.some((r) => r.pendingReasons?.includes("SUSPECTED_FRAUD")))
      return "PENDING_REVIEW";
    else return "APPROVED";
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function useAuthenticateManagedIdentityWithInstantAccess(): [
  (
    e: unknown
  ) => Promise<AuthenticateManagedIdentityWithInstantAccessResult | Error>,
  BaseQueryData<AuthenticateManagedIdentityWithInstantAccessResult>
] {
  const programId = useProgramId();

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
      const fraudStatus = await fetchFraud(
        programId,
        result.authenticateManagedIdentityWithInstantAccess.token
      );

      if (fraudStatus === "APPROVED") {
        const jwt = result.authenticateManagedIdentityWithInstantAccess.token;
        const email = result.authenticateManagedIdentityWithInstantAccess.email;

        setUserIdentity({
          jwt,
          id: email,
          accountId: email,
        });
      } else {
        return { name: "fraud_error", message: "Referral flagged as fraud." };
      }
    }

    return result;
  };

  return [requestAndSetUserIdentity, { loading, data, errors }];
}
