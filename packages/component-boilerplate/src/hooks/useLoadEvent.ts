import { UserIdentity } from "@saasquatch/component-environment";
import { useEffect } from "@saasquatch/universal-hooks";
import { equal as deepEqual } from "@wry/equality";
import debugFn from "debug";
import { ContextProvider } from "dom-context";
import { gql } from "graphql-request";
import {
  useEngagementMedium,
  useProgramId,
  useUserIdentity,
} from "./environment";
import { useMutation } from "./graphql/useMutation";
import { useHost } from "./useHost";

const LOAD_EVENT_CONTEXT_NAME = "sq:load-event";
export const debug = debugFn(LOAD_EVENT_CONTEXT_NAME);

declare global {
  interface Window {
    squatchLoadEvent?: ContextProvider<EventContext>;
  }
}

type EventContext = {
  userIdentity?: UserIdentity;
  programId?: string;
};

const FIRE_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function lazilyStartLoadEventContext() {
  let globalProvider = window.squatchLoadEvent;

  if (!globalProvider) {
    debug("Creating load event provider");

    globalProvider = new ContextProvider<EventContext>({
      element: document.documentElement,
      initialState: {
        userIdentity: undefined,
        programId: undefined,
      },
      contextName: LOAD_EVENT_CONTEXT_NAME,
    }).start();

    window.squatchLoadEvent = globalProvider;
  }

  return globalProvider;
}

export function useLoadEvent() {
  const host = useHost();
  const globalProvider = lazilyStartLoadEventContext();

  const engagementMedium = useEngagementMedium();

  const userIdentity = useUserIdentity();

  const programId = useProgramId();

  const [dispatch] = useMutation(FIRE_EVENT);

  useEffect(() => {
    if (!userIdentity || !programId || !globalProvider?.context) return;

    if (
      // First time loading
      !globalProvider.context.userIdentity ||
      // User changed
      !deepEqual(userIdentity, globalProvider.context.userIdentity) ||
      // Different programId
      programId !== globalProvider.context.programId
    ) {
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

      debug("Event sent", { variables, globalProvider });

      globalProvider.context = { userIdentity, programId };
    }
  }, [userIdentity?.id, userIdentity?.accountId, programId]);
}
