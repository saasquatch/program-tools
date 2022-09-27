import gql from "graphql-tag";

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

  const updateUserIdentity = (result: ManagedIdentitySessionResult | Error) => {
    if (!(result instanceof Error) && result.managedIdentitySession) {
      setUserIdentity({
        ...userIdentity,
        managedIdentity: result.managedIdentitySession,
      });
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
