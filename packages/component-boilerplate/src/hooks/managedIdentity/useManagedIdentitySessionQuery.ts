import { gql } from "graphql-tag";
import type { UserIdentity } from "@saasquatch/component-environment";

import type { QueryData } from "../graphql/useBaseQuery.ts";
import { useUserIdentity, setUserIdentity } from "../environment/index.ts";
import { useLazyQuery } from "../graphql/useLazyQuery.ts";

const ManagedIdentitySessionQuery = gql`
  query ManagedIdentitySession {
    managedIdentitySession {
      email
      emailVerified
      sessionData
    }
  }
`;

interface ManagedIdentitySessionResult {
  managedIdentitySession: {
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

export function useManagedIdentitySessionQuery(): [
  () => Promise<ManagedIdentitySessionResult | Error>,
  QueryData<ManagedIdentitySessionResult>
] {
  const userIdentity = useUserIdentity();
  const [request, { loading, data, errors, refetch }] =
    useLazyQuery<ManagedIdentitySessionResult>(ManagedIdentitySessionQuery);

  const updateUserIdentity = (result: ManagedIdentitySessionResult | Error) => {
    if (!(result instanceof Error) && result.managedIdentitySession) {
      // Without a current identity this sets one with no id/accountId, as it always has.
      setUserIdentity({
        ...userIdentity,
        managedIdentity: result.managedIdentitySession,
      } as UserIdentity);
    }
  };

  const requestAndSetUserIdentity = async () => {
    const result = await request({});
    updateUserIdentity(result);
    return result;
  };

  const refetchAndSetUserIdentity = async () => {
    const result = await refetch();
    updateUserIdentity(result);
    return result;
  };

  return [
    requestAndSetUserIdentity,
    { loading, data, errors, refetch: refetchAndSetUserIdentity },
  ];
}
