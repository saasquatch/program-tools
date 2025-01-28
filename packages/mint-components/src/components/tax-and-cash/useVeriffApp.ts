import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { gql } from "graphql-request";

const CREATE_IMPACT_VERIFICATION_SESSION = gql`
  mutation createImpactVerificationSession($user: UserIdInput!) {
    createImpactPublisherIdentityVerificationSession(user: $user) {
      sessionUrl
    }
  }
`;

const REFRESH_USER_STATUS = gql`
  mutation refreshImpactPublisherFinanceStatus($user: UserIdInput!) {
    refreshImpactPublisherFinanceStatus(user: $user) {
      id
    }
  }
`;

export function useVeriffApp({ onComplete }: { onComplete: () => void }) {
  const { id, accountId } = useUserIdentity();
  const [createImpactVerificationSessionMutation, { loading, errors }] =
    useMutation(CREATE_IMPACT_VERIFICATION_SESSION);
  const [
    refreshImpactPublisherFinanceStatus,
    { loading: refreshLoading, errors: refreshErrors },
  ] = useMutation(CREATE_IMPACT_VERIFICATION_SESSION);

  const refresh = async () => {
    try {
      const res = await refreshImpactPublisherFinanceStatus({
        user: { id, accountId },
      });
      if (!res || (res as Error).message) throw new Error();

      onComplete();
    } catch (e) {
      console.error("Failed to initialise Veriff:", e);
    }
  };

  const render = async () => {
    try {
      const res = await createImpactVerificationSessionMutation({
        user: { id, accountId },
      });
      if (!res || (res as Error).message) throw new Error();

      const sessionUrl =
        res.createImpactPublisherIdentityVerificationSession.sessionUrl;

      createVeriffFrame({
        url: sessionUrl,
        onEvent: (msg: MESSAGES) => {
          switch (msg) {
            case MESSAGES.FINISHED:
            case MESSAGES.CANCELED:
              refresh();
          }
        },
      });
    } catch (e) {
      console.error("Failed to initialise Veriff:", e);
    }
  };

  return {
    render,
    loading: loading || refreshLoading,
    errors: errors || refreshErrors,
  };
}
