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

const VerifyUserEmailMutation = gql`
  mutation verifyUserEmail($user: UserIdInput!, $code: String!) {
    verifyUserEmail(user: $user, code: $code) {
      id
      accountId
      email
      emailVerified
    }
  }
`;

const SubmitImpactCodeMutation = gql`
  mutation submitImpactPublisherEmail2FACode(
    $user: UserIdInput!
    $code: String!
  ) {
    submitImpactPublisherEmail2FACode(user: $user, code: $code) {
      verifiedEmail
      accessKey
    }
  }
`;

// ! It's important when using this hook to ensure initialisation
// ! is done before calling any mutations
export function useVerificationEmail() {
  const userIdentity = useUserIdentity();
  const [hasEmails, setHasEmails] = useState({
    participant: false,
    impact: false,
  });

  const [fetch] = useLazyQuery<{ viewer: User } | undefined>(UserLookupQuery);

  // Send mutations
  const [
    sendParticipantEmail,
    { loading: participantEmailLoading, errors: participantEmailErrors },
  ] = useMutation(ParticipantVerificationEmailMutation);
  const [
    sendImpactEmail,
    { loading: impactEmailLoading, errors: impactEmailErrors },
  ] = useMutation(ImpactVerificationEmailMutation);
  const sendLoading = participantEmailLoading || impactEmailLoading;
  const sendErrors = participantEmailErrors || impactEmailErrors;

  // Verification mutations
  const [
    verifyUserEmail,
    { loading: verifyMutationLoading, errors: verifyMutationErrors },
  ] = useMutation(VerifyUserEmailMutation);
  const [
    submitImpactCode,
    { loading: submitImpactCodeLoading, errors: submitImpactCodeErrors },
  ] = useMutation(SubmitImpactCodeMutation);
  const verifyLoading = verifyMutationLoading || submitImpactCodeLoading;
  const verifyErrors = verifyMutationErrors || submitImpactCodeErrors;

  const [initialized, setInitialized] = useState(false);

  const initialise = async () => {
    try {
      const lookup = await fetch({});
      if (!lookup || lookup instanceof Error) throw new Error();

      setHasEmails({
        participant: !!lookup?.viewer?.email,
        impact: !!lookup?.viewer?.impactConnection?.user?.email,
      });
      setInitialized(true);
    } catch (e) {
      console.error("Could not initialise verification", e);
    }
  };

  const sendVerificationEmail = async () => {
    let result = null;

    if (!initialized) return result;
    if (!hasEmails.participant && !hasEmails.impact) return result;
    try {
      const request = hasEmails.impact ? sendImpactEmail : sendParticipantEmail;
      const res = await request({
        user: {
          id: userIdentity.id,
          accountId: userIdentity.accountId,
        },
      });
      if (res instanceof Error || !res) throw new Error();
      result = hasEmails.impact
        ? res.requestImpactPublisherEmail2FA
        : res.requestUserEmailVerification;
    } catch (e) {
      console.error("Could not send verification email", e);
    } finally {
      return result;
    }
  };

  const verifyVerificationEmail = async (
    code: string
  ): Promise<{ success: boolean; accessKey: string | undefined }> => {
    let result = null;

    if (!initialized) return result;
    if (!hasEmails.participant && !hasEmails.impact) return result;

    try {
      const request = hasEmails.impact ? submitImpactCode : verifyUserEmail;
      const res = await request({
        user: {
          id: userIdentity.id,
          accountId: userIdentity.accountId,
        },
        code,
      });
      if (res instanceof Error || !res) throw new Error();

      result = {
        success: true,
        accessKey: hasEmails.impact
          ? res.submitImpactPublisherEmail2FACode?.accessKey
          : undefined,
      };
    } catch (e) {
      console.error("Could not verify email", e);
    } finally {
      return result;
    }
  };

  useEffect(() => {
    if (!initialized) initialise();
  }, []);

  return {
    initialized,
    send: [
      sendVerificationEmail,
      { loading: sendLoading, errors: sendErrors },
    ] as const,
    verify: [
      verifyVerificationEmail,
      { loading: verifyLoading, errors: verifyErrors },
    ] as const,
  };
}
