import gql from "graphql-tag";
import { useEffect, useCallback } from "@saasquatch/universal-hooks";

import { QueryData } from "../graphql/useBaseQuery";
import {
  useUserIdentity,
  setUserIdentity,
} from "../../environment/UserIdentityContext";
import { useLazyQuery } from "../graphql/useLazyQuery";

const ManagedIdentityQuery = gql`
  query ManagedIdentity {
    managedIdentity {
      email
      emailVerified
      sessionData
    }
  }
`;

interface ManagedIdentityResult {
  managedIdentity: {
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

export function useManagedIdentityQuery(): [
  () => unknown,
  QueryData<ManagedIdentityResult>
] {
  const userIdentity = useUserIdentity();
  const [request, { loading, data, errors, refetch }] =
    useLazyQuery<ManagedIdentityResult>(ManagedIdentityQuery);

  useEffect(() => {
    if (data?.managedIdentity) {
      const { managedIdentity: res } = data;
      setUserIdentity({
        ...userIdentity,
        managedIdentity: res,
      });
    }
  }, [data?.managedIdentity]);

  const requestNoParams = useCallback(() => request({}), [request]);

  return [requestNoParams, { loading, data, errors, refetch }];
}
