import {
  useLazyQuery,
  useMutation,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";

type User = {
  id: string;
  accountId: string;
  email: string | null;
  impactConnection: {
    user: {
      id: string;
      email: string;
    } | null;
  } | null;
};
const UserLookupQuery = gql`
  query userLookup {
    viewer {
      ... on User {
        id
        accountId
        email
        impactConnection {
          user {
            id
            email
          }
        }
      }
    }
  }
`;

const ParticipantVerificationEmailMutation = gql`
  mutation requestUserEmailVerification($user: UserIdInput!) {
    requestUserEmailVerification(user: $user) {
      success
    }
  }
`;

const ImpactVerificationEmailMutation = gql`
  mutation requestImpactPublisherEmail2FA($user: UserIdInput!) {
    requestImpactPublisherEmail2FA(user: $user) {
      success
    }
  }
`;

export function useVerificationEmail() {
  const userIdentity = useUserIdentity();

  const [fetch, { data }] = useLazyQuery<{ viewer: User } | undefined>(
    UserLookupQuery
  );
  const [sendParticipantEmail, { errors: participantEmailErrors }] =
    useMutation(ParticipantVerificationEmailMutation);
  const [sendImpactEmail, { errors: impactEmailErrors }] = useMutation(
    ImpactVerificationEmailMutation
  );

  const [loading, setLoading] = useState(false);

  const sendVerificationEmailMutation = async () => {
    setLoading(true);
    let result = undefined;
    try {
      const lookup = await fetch({});
      if (!lookup || lookup instanceof Error) throw new Error();

      const hasParticipantEmail = lookup.viewer?.email;
      const hasImpactEmail = lookup.viewer?.impactConnection?.user?.email;

      if (!hasParticipantEmail && !hasImpactEmail) throw new Error();

      const request = hasImpactEmail ? sendImpactEmail : sendParticipantEmail;
      const res = await request({
        user: {
          id: userIdentity.id,
          accountId: userIdentity.accountId,
        },
      });
      if (res instanceof Error || !res) throw new Error();
      result = hasImpactEmail
        ? res.requestImpactPublisherEmail2FA
        : res.requestUserEmailVerification;
    } catch (e) {
      console.error("Could not send verification email", e);
    } finally {
      setLoading(false);
      return result;
    }
  };

  return [
    sendVerificationEmailMutation,
    {
      loading,
      errors: participantEmailErrors || impactEmailErrors,
    },
  ] as const;
}
