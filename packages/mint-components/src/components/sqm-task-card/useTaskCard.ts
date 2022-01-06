import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";

const SEND_EVENT = gql`
  mutation taskCardEvent($userEventInput: UserEventInput!) {
    logUserEvent(userEventInput: $userEventInput) {
      userId
    }
  }
`;

export function useTaskCard() {
  const user = useUserIdentity();

  const [sendUserEvent] = useMutation(SEND_EVENT);

  function sendEvent(eventKey: string) {
    sendUserEvent({
      userEventInput: {
        userId: user.id,
        accountId: user.accountId,
        events: [{ key: eventKey, fields: {} }],
      },
    });
  }

  return {
    callbacks: { sendEvent },
  };
}
