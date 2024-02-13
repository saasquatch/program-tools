import { UserIdentity } from "@saasquatch/component-environment";
import debug from "debug";
import { ContextProvider } from "dom-context";
import { gql } from "graphql-request";
import {
  useEngagementMedium,
  useProgramId,
  useUserIdentity,
} from "./environment";
import { useMutation } from "./graphql/useMutation";
import useDeepEffect from "./useDeepEffect";
import { equal as deepEqual } from "@wry/equality";
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
      // User changed
      !deepEqual(userIdentity, globalProvider.context.userIdentity) ||
      // Different programId
      programId !== globalProvider.context.programId ||
      // Never loaded
      !globalProvider.context.loaded
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
      console.log("updated context", {
        programChanged: programId !== globalProvider.context.programId,
        userChanged: deepEqual(
          userIdentity,
          globalProvider.context.userIdentity
        ),
      });
      globalProvider.context = { userIdentity, programId, loaded: true };
    }
  }, [userIdentity, programId]);
}
