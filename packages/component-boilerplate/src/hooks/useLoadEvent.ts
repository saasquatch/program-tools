import { gql } from "graphql-request";
import {
  useEngagementMedium,
  useProgramId,
  useUserIdentity,
} from "./environment";
import { useMutation } from "./graphql/useMutation";
import debug from "debug";
import { ContextProvider } from "dom-context";
import { useHost } from "./useHost";
import { useDomContext } from "@saasquatch/dom-context-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import useDeepEffect from "./useDeepEffect";
import { UserIdentity } from "@saasquatch/component-environment";

declare global {
  interface Window {
    squatchLoadEvent?: ContextProvider<EventContext>;
  }
}

type EventContext = {
  userIdentity?: UserIdentity;
  programId?: string;
  loaded: boolean;
};

const FIRE_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

const LOAD_EVENT_CONTEXT_NAME = "sq:load-event";

export function lazilyStartLoadEventContext() {
  let globalProvider = window.squatchLoadEvent;

  if (!globalProvider) {
    debug("Creating load event provider");

    globalProvider = new ContextProvider<EventContext>({
      element: document.documentElement,
      initialState: {
        userIdentity: undefined,
        programId: undefined,
        loaded: false,
      },
      contextName: LOAD_EVENT_CONTEXT_NAME,
    }).start();

    window.squatchLoadEvent = globalProvider;
  }

  return globalProvider;
}

export function useLoadEvent() {
  const engagementMedium = useEngagementMedium();
  const userIdentity = useUserIdentity();
  const programId = useProgramId();
  const [dispatch] = useMutation(FIRE_EVENT);

  const globalProvider = lazilyStartLoadEventContext();

  useDeepEffect(() => {
    if (!userIdentity || !programId) return;
    if (
      userIdentity !== globalProvider.context.userIdentity ||
      programId !== globalProvider.context.programId
    ) {
      globalProvider.context = { userIdentity, programId, loaded: false };
    }
  }, [userIdentity, programId]);

  if (!userIdentity) {
    // Not logged in. No-op callback for tracking sharing.
    return () => {};
  }

  return () => {
    console.log({ globalProvider, value: globalProvider.context });
    if (globalProvider.context.loaded) return;

    const variables = {
      eventMeta: {
        programId,
        id: userIdentity.id,
        accountId: userIdentity.accountId,
        type: "USER_REFERRAL_PROGRAM_LOADED_EVENT",
        meta: {
          engagementMedium,
        },
      },
    };
    dispatch(variables);
    globalProvider.context = { userIdentity, programId, loaded: true };
  };
}
