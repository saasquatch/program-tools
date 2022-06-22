import gql from "graphql-tag";
import { useEffect, useCallback } from "@saasquatch/universal-hooks";

import { QueryData } from "../graphql/useBaseQuery";
import { useUserIdentity, setUserIdentity } from "../environment";
import { useLazyQuery } from "../graphql/useLazyQuery";

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

  useEffect(() => {
    if (data?.managedIdentitySession) {
      const { managedIdentitySession: res } = data;
      setUserIdentity({
        ...userIdentity,
        managedIdentity: res,
      });
    }
  }, [data?.managedIdentitySession]);

  const requestNoParams = useCallback(() => request({}), [request]);

  return [requestNoParams, { loading, data, errors, refetch }];
}
