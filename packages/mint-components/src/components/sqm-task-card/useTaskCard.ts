import {
  useMutation,
  useUserIdentity,
  useRefreshDispatcher,
  useLocale,
} from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/stencil-hooks";
import { gql } from "graphql-request";
import { TaskCard } from "./sqm-task-card";

const SEND_EVENT = gql`
  mutation taskCardEvent($userEventInput: UserEventInput!) {
    logUserEvent(userEventInput: $userEventInput) {
      userId
    }
  }
`;

export function useTaskCard(props: TaskCard) {
  const user = useUserIdentity();
  const locale = useLocale();
  const [sendUserEvent, { data, loading: loadingEvent }] =
    useMutation(SEND_EVENT);

  const { refresh } = useRefreshDispatcher();
  useEffect(() => {
    if (data) {
      refresh();
      openLink();
    }
  }, [data]);

  function openLink() {
    props.openNewTab
      ? window.open(props.buttonLink)
      : window.open(props.buttonLink, "_parent");
  }

  function sendEvent(eventKey: string) {
    sendUserEvent({
      userEventInput: {
        userId: user?.id,
        accountId: user?.accountId,
        events: [{ key: eventKey, fields: {} }],
      },
    });
  }

  function onClick() {
    props.eventKey ? sendEvent(props.eventKey) : openLink();
  }

  return {
    states: { loadingEvent, locale },
    callbacks: { sendEvent, onClick },
  };
}
